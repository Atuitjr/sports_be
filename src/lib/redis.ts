import { Redis } from '@upstash/redis';
import { logger } from './logger.js';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL ?? '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
});

logger.info('Upstash Redis client initialised');

export default redis;
