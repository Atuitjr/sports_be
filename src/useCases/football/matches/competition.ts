import type { MatchPerCompetition } from '../../../interfaces/football/matches.js';
import { FOOTBALL_MATCHES_PER_COMPETITION_CACHE_KEY } from '../../../constants/football.js';
import { footballRepository } from '../../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../../repositories/redisRepository.js';

export const getMatchesPerCompetitionUseCase = async (leagueId: number): Promise<MatchPerCompetition> => {
    const cached = await getHashDataByField<MatchPerCompetition>(FOOTBALL_MATCHES_PER_COMPETITION_CACHE_KEY, String(leagueId));

    if (cached) {
        return cached;
    }

    const matchesResponse = await footballRepository.getMatchesPerCompetition(leagueId);
    await setHashData(FOOTBALL_MATCHES_PER_COMPETITION_CACHE_KEY, String(leagueId), matchesResponse);

    return matchesResponse;
};
