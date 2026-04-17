import Redis from 'ioredis';

// Use an environment variable for the connection string
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redis = new (Redis as any)(redisUrl);

redis.on('connect', () => console.log('Redis connected successfully'));
redis.on('error', (err: any) => console.error('Redis connection error:', err));

export default redis;
