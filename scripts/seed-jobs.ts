
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Job from '../src/models/Job'; // adjusting path for script execution context usually requires ts-node or careful pathing. 
// For simplicity in a Next.js project script, we might need to hardcode the model schema or use a relative path that works.
// Let's assume we run this via `npx tsx scripts/seed-jobs.ts` and imports work if tsconfig allows.

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

// Inline Schema Definition to avoid import path issues in some environments
const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    location: String,
    link: String,
    source: String,
    postedAt: Date,
    tags: [String],
    isRemote: Boolean,
    description: String,
    createdAt: { type: Date, default: Date.now, expires: '30d' }
});

const JobModel = mongoose.models.Job || mongoose.model('Job', jobSchema);

const domains = ["Software Engineer", "Frontend Developer", "Backend Developer", "Data Scientist", "Product Manager", "UI/UX Designer", "Marketing Intern"];
const types = ["Internship", "Fresher", "Junior"];
const companies = ["Google", "Microsoft", "Amazon", "Flipkart", "Razorpay", "Cred", "Groww", "Zerodha", "Swiggy", "Zomato", "Startup Inc", "TechCorp"];
const locations = ["Remote", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune"];

const generateJobs = (count: number) => {
    const jobs = [];
    for (let i = 0; i < count; i++) {
        const domain = domains[Math.floor(Math.random() * domains.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const company = companies[Math.floor(Math.random() * companies.length)];
        const loc = locations[Math.floor(Math.random() * locations.length)];

        // Generate a "Real" looking link (search link)
        const isStartup = Math.random() > 0.5;
        const source = isStartup ? "Wellfound" : "LinkedIn";
        const link = source === "LinkedIn"
            ? `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(domain + " " + type)}`
            : `https://wellfound.com/jobs?q=${encodeURIComponent(domain)}`;

        jobs.push({
            title: `${domain} ${type}`,
            company: company,
            location: loc,
            link: link + `&id=${i}`, // Ensure uniqueness
            source: source,
            postedAt: new Date(),
            tags: [domain, type, isStartup ? "Startup" : "MNC", "Hiring Now"],
            isRemote: loc === "Remote",
            description: `Exciting opportunity for a ${type} ${domain} at ${company}. Apply now!`
        });
    }
    return jobs;
};

async function seed() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected.");

        console.log("Clearing old jobs...");
        await JobModel.deleteMany({});

        console.log("Generating 100 new jobs...");
        const jobs = generateJobs(100);

        await JobModel.insertMany(jobs);
        console.log("Seeding complete! 100 jobs inserted.");

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
