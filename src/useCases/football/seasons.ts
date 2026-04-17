import { FOOTBALL_CACHE_TTL, FOOTBALL_SEASONS_CACHE_KEY } from "../../constants/football.ts";
import { footballRepository } from "../../repositories/football.ts";
import { getCachedDataByKey, setCachedData } from "../../repositories/redisRepository.ts";

export const getSeasonsUseCase = async () => {
    try {
        const cachedData = await getCachedDataByKey(FOOTBALL_SEASONS_CACHE_KEY);
        let seasonsList: Number[] | null = cachedData || null;

        if (seasonsList) {
            return seasonsList; 
        }

        seasonsList = await footballRepository.getSeasons();
        await setCachedData(FOOTBALL_SEASONS_CACHE_KEY, seasonsList, FOOTBALL_CACHE_TTL);


        return seasonsList; 
    } catch (error) {
        throw new Error(`Error fetching seasons: ${error}`);
    }
}