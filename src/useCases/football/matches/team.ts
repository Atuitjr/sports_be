import type { MatchesPerTeam } from '../../../interfaces/football/matches.js';
import { FOOTBALL_MATCHES_PER_TEAM_CACHE_KEY } from '../../../constants/football.js';
import { footballRepository } from '../../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../../repositories/redisRepository.js';

export const getMatchesPerTeamUseCase = async (teamId: number): Promise<MatchesPerTeam> => {
    const cached = await getHashDataByField<MatchesPerTeam>(FOOTBALL_MATCHES_PER_TEAM_CACHE_KEY, String(teamId));

    if (cached) {
        return cached;
    }

    const matchesResponse = await footballRepository.getMatchesPerTeam(teamId);
    await setHashData(FOOTBALL_MATCHES_PER_TEAM_CACHE_KEY, String(teamId), matchesResponse);

    return matchesResponse;
};
