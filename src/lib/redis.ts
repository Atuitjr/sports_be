import { Redis } from 'ioredis';
import { logger } from './logger.js';

const redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';

const redis = new Redis(redisUrl);

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err: unknown) => logger.error('Redis connection error', { err }));

export default redis;
