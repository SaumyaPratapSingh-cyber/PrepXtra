import { Queue, Worker, QueueEvents } from 'bullmq';
import IORedis from 'ioredis';

// Queue names
export const JOB_QUEUE_NAME = 'job-scraper-queue';
export const EMAIL_QUEUE_NAME = 'email-notification-queue';

// Redis Connection
const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
    retryStrategy: (times) => {
        // Fail fast if Redis is not available to switch to fallback mode
        if (times > 3) {
            console.warn("Redis connection failed. Switching to In-Memory mode.");
            return null;
        }
        return Math.min(times * 50, 2000);
    }
});

let isRedisAvailable = false;

connection.on('connect', () => {
    console.log('Connected to Redis');
    isRedisAvailable = true;
});

connection.on('error', (err) => {
    // console.warn('Redis connection error:', err.message);
    isRedisAvailable = false;
});

// --- In-Memory Fallback System ---
type Task = () => Promise<void>;
const memoryQueue: Record<string, Task[]> = {
    [JOB_QUEUE_NAME]: [],
    [EMAIL_QUEUE_NAME]: []
};

const processMemoryQueue = async (queueName: string) => {
    const tasks = memoryQueue[queueName];
    if (tasks && tasks.length > 0) {
        const task = tasks.shift();
        if (task) {
            try {
                await task();
            } catch (e) {
                console.error(`Error processing in-memory task for ${queueName}:`, e);
            }
        }
    }
};

// Start a simple interval to process memory queues
setInterval(() => processMemoryQueue(JOB_QUEUE_NAME), 1000); // Process 1 job per second
setInterval(() => processMemoryQueue(EMAIL_QUEUE_NAME), 1000); // Process 1 email per second

// --- Unified Queue Interface ---

export const addToQueue = async (queueName: string, data: any) => {
    if (isRedisAvailable) {
        try {
            const queue = new Queue(queueName, { connection: connection as any });
            await queue.add('job', data);
            await queue.close();
            return true;
        } catch (e) {
            console.warn(`Redis add failed, falling back to memory for ${queueName}`);
        }
    }

    // Fallback or if Redis unavailable
    // For in-memory, we can't easily serialize "processors", so we just push the data 
    // and rely on a specific "handler" registry that we'd need to build if we were full blown.
    // BUT, for simplicity in this specific "scraper" context, 
    // we will emit an event or just call the processor directly if possible?
    // Actually, handling "processors" in memory is tricky without a registry.
    // Let's create a simple registry here.

    const handler = processorRegistry[queueName];
    if (handler) {
        memoryQueue[queueName].push(async () => {
            console.log(`[MemoryQueue] Processing ${queueName}...`);
            await handler({ data });
        });
        return true;
    } else {
        console.error(`No processor registered for in-memory queue: ${queueName}`);
        return false;
    }
};

type ProcessorFunction = (job: { data: any }) => Promise<void>;
const processorRegistry: Record<string, ProcessorFunction> = {};

export const registerWorker = (queueName: string, processor: ProcessorFunction) => {
    // Register for In-Memory Fallback
    processorRegistry[queueName] = processor;

    // Register for Redis (BullMQ)
    // We wrap this significantly to avoid crashing if Redis is down
    try {
        const worker = new Worker(queueName, async (job) => {
            await processor(job);
        }, { connection: connection as any });

        worker.on('failed', (job, err) => {
            console.error(`${queueName} Job failed:`, err);
        });

        console.log(`Worker registered for ${queueName} (Redis + Memory)`);
        return worker;
    } catch (e) {
        console.warn(`Could not start Redis worker for ${queueName}, running in Memory-Only mode.`);
        return null;
    }
};
