import redis from '../lib/redis.js';
import { logger } from '../lib/logger.js';

export const setCachedData = async <T>(key: string, value: T, expirationInSeconds?: number): Promise<void> => {
    await redis.set(key, value, expirationInSeconds !== undefined ? { ex: expirationInSeconds } : undefined);
    logger.debug('Cache set', { key });
};

export const getCachedDataByKey = async <T>(key: string): Promise<T | null> => {
    const data = await redis.get<T>(key);
    if (!data) {
        logger.debug('Cache miss', { key });
        return null;
    }
    logger.debug('Cache hit', { key });
    return data;
};

// --- Hash Operations (HSET / HGET) ---

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

type HashPayload<T> = { data: T; timestamp: number };

export const setHashData = async <T>(hashKey: string, field: string, value: T): Promise<void> => {
    const payload: HashPayload<T> = { data: value, timestamp: Date.now() };
    await redis.hset(hashKey, { [field]: payload });
    logger.debug('Hash set', { hashKey, field });
};

export const getHashDataByField = async <T>(hashKey: string, field: string): Promise<T | null> => {
    const raw = await redis.hget<HashPayload<T>>(hashKey, field);
    if (!raw) {
        logger.debug('Hash miss', { hashKey, field });
        return null;
    }

    if (Date.now() - raw.timestamp > ONE_WEEK_MS) {
        logger.debug('Hash field expired, deleting', { hashKey, field });
        await redis.hdel(hashKey, field);
        return null;
    }

    logger.debug('Hash hit', { hashKey, field });
    return raw.data;
};

export const getAllHashData = async <T>(hashKey: string): Promise<Record<string, T> | null> => {
    const allData = await redis.hgetall<Record<string, HashPayload<T>>>(hashKey);
    if (!allData || Object.keys(allData).length === 0) return null;

    const parsed: Record<string, T> = {};
    for (const [field, payload] of Object.entries(allData)) {
        parsed[field] = payload.data;
    }
    logger.debug('Hash getall', { hashKey, fields: Object.keys(parsed).length });
    return parsed;
};
