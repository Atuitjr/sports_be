import { Redis } from 'ioredis';
import { logger } from './logger.js';

const redisUrl = process.env.REDIS_URL ?? 'redis://127.0.0.1:6379';
const isTls = redisUrl.startsWith('rediss://');

const redis = new Redis(redisUrl, {
  ...(isTls && { tls: { rejectUnauthorized: false } }),
  maxRetriesPerRequest: 3,
  retryStrategy: (times: number) => {
    if (times > 5) {
      logger.error('Redis max reconnection attempts reached, giving up');
      return null;
    }
    return Math.min(times * 500, 2000);
  },
});

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err: unknown) => logger.error('Redis connection error', { err }));

export default redis;
