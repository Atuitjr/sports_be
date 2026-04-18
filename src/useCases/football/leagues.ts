import { FOOTBALL_LEAGUES_CACHE_KEY } from '../../constants/football.js';
import type { LeagueDetails } from '../../interfaces/football/leagues.js';
import { footballRepository } from '../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../repositories/redisRepository.js';

type LeaguesCache = { leagues: LeagueDetails[] };

export const getLeaguesUseCase = async (countryId: number): Promise<LeaguesCache> => {
    const cached = await getHashDataByField<LeaguesCache>(FOOTBALL_LEAGUES_CACHE_KEY, String(countryId));

    if (cached) {
        return cached;
    }

    const leaguesResponse = await footballRepository.getLeagues(countryId);
    const payload: LeaguesCache = { leagues: leaguesResponse };
    await setHashData(FOOTBALL_LEAGUES_CACHE_KEY, String(countryId), payload);

    return payload;
};
