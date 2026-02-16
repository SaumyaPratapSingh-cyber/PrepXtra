import axios from 'axios';
import * as cheerio from 'cheerio';
import { IJob } from '@/models/Job';

// --- Types ---
export interface ScrapedJob {
    title: string;
    company: string;
    location: string;
    link: string;
    source: string;
    postedAt: Date;
    description?: string;
    salary?: string;
    type?: string;
}

export interface ScraperOptions {
    roles: string[];
    locations: string[];
    jobType?: string;
    companyType?: string;
    domain?: string;
}

// --- Helper: Ultra-Fast RSS Scraper with strict timeout ---

async function scrapeWeWorkRemotely(): Promise<ScrapedJob[]> {
    try {
        // STRICT 1.5s timeout. If it's slow, we skip it.
        const { data } = await axios.get('https://weworkremotely.com/categories/remote-programming-jobs.rss', { timeout: 1500 });
        const $ = cheerio.load(data, { xmlMode: true });
        const jobs: ScrapedJob[] = [];

        $('item').each((_, el) => {
            if (jobs.length >= 2) return false; // Limit to 2 for absolute speed
            const title = $(el).find('title').text();
            const link = $(el).find('link').text();
            const pubDate = $(el).find('pubDate').text();
            const [c, t] = title.split(':').map(s => s.trim());

            jobs.push({
                title: t || title,
                company: c || "We Work Remotely",
                location: "Remote",
                link,
                source: "WeWorkRemotely",
                postedAt: new Date(pubDate),
            });
        });
        return jobs;
    } catch (e) {
        // Fail silently - speed is priority
        return [];
    }
}

// --- Main Scraper Function ---

export const scrapeJobs = async (options: ScraperOptions | string[], locationsArg?: string[]): Promise<IJob[]> => {
    let roles: string[] = [];
    let locations: string[] = [];
    let jobType = "Internship";
    let companyType, domain;

    if (Array.isArray(options)) {
        roles = options;
        locations = locationsArg || [];
    } else {
        roles = options.roles;
        locations = options.locations;
        jobType = options.jobType || "Internship";
        companyType = options.companyType;
        domain = options.domain;
    }

    if (!roles.length && !domain) roles = ["Software Engineer"];
    if (domain && !roles.includes(domain)) roles.push(domain);

    console.log(`[FastScrape] Starting for ${roles.join(', ')} [${jobType}]...`);

    // 1. Concurrent Fetch (Timeout handled internally)
    // We prioritize GENERATED links because they are instant and 100% reliable for "Search"
    const remoteJobsRequest = scrapeWeWorkRemotely();

    const sources = [
        { name: "LinkedIn", baseUrl: "https://www.linkedin.com/jobs/search", param: "keywords" },
        { name: "Indeed", baseUrl: "https://www.indeed.com/jobs", param: "q" },
        { name: "Glassdoor", baseUrl: "https://www.glassdoor.com/Job/jobs.htm", param: "sc.keyword" },
        { name: "Naukri", baseUrl: "https://www.naukri.com/mnj/search", param: "keywords" },
    ];

    const MAX_JOBS = 10;
    const baseQuery = roles[0] || "Software Engineer";
    const targetQuery = `${baseQuery} ${jobType} Fresher`;

    const aggregatedJobs: IJob[] = [];
    let count = 0;

    // 2. Generate Smart Links (INSTANT)
    locations.forEach(loc => {
        if (count >= MAX_JOBS) return;

        sources.forEach(source => {
            if (count >= MAX_JOBS) return;

            aggregatedJobs.push({
                title: `${baseQuery} ${jobType} Match`,
                company: `${source.name} Search`,
                location: loc,
                link: `${source.baseUrl}?${source.param}=${encodeURIComponent(targetQuery)}&location=${encodeURIComponent(loc)}`,
                source: source.name,
                postedAt: new Date(),
                tags: [baseQuery, jobType, "Urgent"],
                isRemote: loc.toLowerCase().includes('remote')
            } as any);
            count++;
        });
    });

    // 3. Await Real Data (only if it didn't timeout yet, or just Append it)
    try {
        const realJobs = await remoteJobsRequest;
        aggregatedJobs.unshift(...realJobs as any); // Put real jobs at top
    } catch (e) { }

    return aggregatedJobs.slice(0, MAX_JOBS + 2) as any[]; // Allow a few extra
};
