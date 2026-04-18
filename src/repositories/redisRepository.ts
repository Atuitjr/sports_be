import redis from '../lib/redis.js';
import { logger } from '../lib/logger.js';

export const setCachedData = async <T>(key: string, value: T, expirationInSeconds?: number): Promise<void> => {
  const serialized = JSON.stringify(value);
  if (expirationInSeconds !== undefined) {
    await redis.set(key, serialized, 'EX', expirationInSeconds);
  } else {
    await redis.set(key, serialized);
  }
  logger.debug('Cache set', { key });
};

export const getCachedDataByKey = async <T>(key: string): Promise<T | null> => {
  const cachedData = await redis.get(key);
  if (!cachedData) {
    logger.debug('Cache miss', { key });
    return null;
  }
  logger.debug('Cache hit', { key });
  return JSON.parse(cachedData) as T;
};

// --- Hash Operations (HSET / HGET) ---

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const setHashData = async <T>(hashKey: string, field: string, value: T): Promise<void> => {
  const payload = { data: value, timestamp: Date.now() };
  await redis.hset(hashKey, field, JSON.stringify(payload));
  logger.debug('Hash set', { hashKey, field });
};

export const getHashDataByField = async <T>(hashKey: string, field: string): Promise<T | null> => {
  const rawData = await redis.hget(hashKey, field);
  if (!rawData) {
    logger.debug('Hash miss', { hashKey, field });
    return null;
  }

  const { data, timestamp } = JSON.parse(rawData) as { data: T; timestamp: number };

  if (Date.now() - timestamp > ONE_WEEK_MS) {
    logger.debug('Hash field expired, deleting', { hashKey, field });
    await redis.hdel(hashKey, field);
    return null;
  }

  logger.debug('Hash hit', { hashKey, field });
  return data;
};

export const getAllHashData = async <T>(hashKey: string): Promise<Record<string, T> | null> => {
  const allData = await redis.hgetall(hashKey);
  if (!allData || Object.keys(allData).length === 0) return null;

  const parsed: Record<string, T> = {};
  for (const [field, value] of Object.entries(allData)) {
    parsed[field] = JSON.parse(value) as T;
  }
  logger.debug('Hash getall', { hashKey, fields: Object.keys(parsed).length });
  return parsed;
};
