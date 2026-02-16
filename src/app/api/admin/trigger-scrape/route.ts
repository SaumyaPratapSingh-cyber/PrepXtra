import { NextResponse } from 'next/server';
import { scrapeJobs } from '@/lib/scrapers';
import Job from '@/models/Job';
import { sendJobAlert } from '@/lib/mail';
import mongoose from 'mongoose';

// Enhanced DB Connection 
const ensureDb = async () => {
    try {
        if (mongoose.connection.readyState === 1) return;
        await mongoose.connect(process.env.MONGODB_URI!, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (e) {
        console.error("DB Connection Warning:", e);
        // If DB fails, we will deliberately THROW so we can catch and fall back to "Live Scrape" mode 
        // OR we just swallow and let the scraper run without saving.
        // For "Read from DB First", we need DB.
    }
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { filters, email } = body;

        const role = filters?.roles?.[0] || filters?.domain || "Software Engineer";
        const type = filters?.jobType || "Internship";
        const companyType = filters?.companyType;

        let jobsToSend: any[] = [];
        let source = "Database Cache";

        // STRATEGY: Try DB First (Instant)
        try {
            await ensureDb();

            // Build Query
            const query: any = {};
            // Simple regex match for title using the Domain/Role
            if (role) query.title = { $regex: role, $options: 'i' };
            // If type provided, check title or tags
            if (type) query.tags = { $in: [new RegExp(type, 'i')] };

            // Fetch recent jobs
            const dbJobs = await Job.find(query).sort({ postedAt: -1 }).limit(20);

            if (dbJobs.length >= 5) {
                console.log(`[Cache Hit] Found ${dbJobs.length} jobs in DB.`);
                jobsToSend = dbJobs;
            } else {
                console.log(`[Cache Miss] Only found ${dbJobs.length} jobs. Triggering live scrape.`);
                source = "Live Scraper";
            }
        } catch (dbError) {
            console.warn("DB unreachable, skipping cache check.");
            source = "Live Scraper (DB Failed)";
        }

        // Fallback: If DB had no jobs, Scrape Live
        if (jobsToSend.length < 5) {
            const scrapedJobs = await scrapeJobs({
                roles: [role],
                locations: ["Remote", "India"],
                jobType: type,
                companyType: companyType
            });
            // Append to whatever we found (or replace)
            jobsToSend = scrapedJobs;

            // Try saving asynchronously (fire and forget)
            (async () => {
                try {
                    await ensureDb();
                    for (const j of scrapedJobs) {
                        await Job.create(j).catch(() => { }); // ignore dupes
                    }
                } catch (e) { }
            })();
        }

        // 3. Send Email
        let message = `Found ${jobsToSend.length} jobs via ${source}.`;

        if (email) {
            console.log(`[Email] Sending to ${email}...`);
            await sendJobAlert(email, jobsToSend);
            message += ` Sent to ${email}.`;
        }

        return NextResponse.json({
            success: true,
            message: message,
            jobCount: jobsToSend.length
        });

    } catch (error: any) {
        console.error("Fatal Error:", error);
        return NextResponse.json({
            success: false,
            message: `Error: ${error.message}`
        }, { status: 500 });
    }
}
