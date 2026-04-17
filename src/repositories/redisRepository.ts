import redis from '../lib/redis.ts';

export const setCachedData = async (key: string, value: any, expirationInSeconds?: number) => {
  try {
    if (expirationInSeconds) {
      console.log(`Set Cached data for  ${key}`)
      await redis.set(key, JSON.stringify(value), 'EX', expirationInSeconds);
    } else {
      await redis.set(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error setting cached data:', error);
  }
}

export const getCachedDataByKey = async (key: string) => {
  try {
    const cachedData = await redis.get(key); 
    if (cachedData) {
      console.log(`Cached data read for ${key}`);
      return JSON.parse(cachedData);
    }
    console.log(`No cached data for ${key}`);
    return null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
}

// --- Hash Operations (HSET / HGET) ---

// 1 Week in milliseconds (7 days * 24h * 60m * 60s * 1000ms)
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const setHashData = async <T>(hashKey: string, field: string, value: T) => {
  try {
    // Create a wrapper object containing the value and the current timestamp
    const payload = {
      data: value,
      timestamp: Date.now(), // Current time in ms
    };

    console.log(`Setting hashed data for ${hashKey} field: ${field}`);
    await redis.hset(hashKey, field, JSON.stringify(payload));
  } catch (error) {
    console.error(`Error setting hash field ${field} in ${hashKey}:`, error);
  }
};

export const getHashDataByField = async <T>(hashKey: string, field: string): Promise<T | null> => {
  try {
    const rawData = await redis.hget(hashKey, field);
    if (!rawData) {
      console.log(`No hashed data found for ${hashKey}-${field}`);
      return null;
    }

    const { data, timestamp } = JSON.parse(rawData);
    const now = Date.now();

    // Check if the difference is greater than one week
    if (now - timestamp > ONE_WEEK_MS) {
      console.log(`Data for ${hashKey}-${field} is older than a week. Deleting...`);
      await redis.hdel(hashKey, field); // Cleanup expired field
      return null;
    }

    console.log(`Getting hashed data for ${hashKey}-${field}`);
    return data as T;
  } catch (error) {
    console.error(`Error getting/validating hash field ${field} from ${hashKey}:`, error);
    return null;
  }
};

/**
 * Retrieves all fields and values from a Hash as a single object.
 */
export const getAllHashData = async (hashKey: string) => {
  try {
    const allData = await redis.hgetall(hashKey);
    
    console.log(`Getting hashed data for ${hashKey} - all fields`)
    // Parse JSON for each field automatically
    const parsedData: Record<string, any> = {};
    for (const [field, value] of Object.entries(allData)) {
      try {
        parsedData[field] = JSON.parse(value as string);
      } catch {
        parsedData[field] = value; // Fallback if not JSON
      }
    }
    return parsedData;
  } catch (error) {
    console.error(`Error getting all hash data for ${hashKey}:`, error);
    return null;
  }
};