import { FOOTBALL_STANDINGS_CACHE_KEY } from '../../constants/football.js';
import type { standingsDetails } from '../../interfaces/football/standings.js';
import { footballRepository } from '../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../repositories/redisRepository.js';

type StandingsCache = { standings: standingsDetails[] };

export const getStandingsUseCase = async (leagueId: number): Promise<standingsDetails[]> => {
    const cached = await getHashDataByField<StandingsCache>(FOOTBALL_STANDINGS_CACHE_KEY, String(leagueId));

    if (cached) {
        return cached.standings;
    }

    const standingsResponse = await footballRepository.getStandings(leagueId);
    const payload: StandingsCache = { standings: standingsResponse };
    await setHashData(FOOTBALL_STANDINGS_CACHE_KEY, String(leagueId), payload);

    return payload.standings;
};
