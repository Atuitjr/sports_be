import { FOOTBALL_CACHE_TTL, FOOTBALL_SEASONS_CACHE_KEY } from '../../constants/football.js';
import { footballRepository } from '../../repositories/football.js';
import { getCachedDataByKey, setCachedData } from '../../repositories/redisRepository.js';

export const getSeasonsUseCase = async (): Promise<number[]> => {
    const cached = await getCachedDataByKey<number[]>(FOOTBALL_SEASONS_CACHE_KEY);

    if (cached) {
        return cached;
    }

    const seasons = await footballRepository.getSeasons();
    await setCachedData(FOOTBALL_SEASONS_CACHE_KEY, seasons, FOOTBALL_CACHE_TTL);

    return seasons;
};
