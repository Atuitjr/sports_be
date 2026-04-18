import { FOOTBALL_TEAMS_CACHE_KEY, FOOTBALL_TEAMS_PER_LEAGUE_CACHE_KEY } from '../../constants/football.js';
import type { TeamId, TeamInfo, TeamsByLeague } from '../../interfaces/football/teams.js';
import { footballRepository } from '../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../repositories/redisRepository.js';

export const getTeamsUseCase = async (teamId: TeamId): Promise<TeamInfo> => {
    const cached = await getHashDataByField<TeamInfo>(FOOTBALL_TEAMS_CACHE_KEY, String(teamId));

    if (cached) {
        return cached;
    }

    const teamResponse = await footballRepository.getTeamInfo(teamId);
    await setHashData(FOOTBALL_TEAMS_CACHE_KEY, String(teamId), teamResponse);

    return teamResponse;
};

export const getTeamsByLeagueUseCase = async (leagueId: number): Promise<TeamsByLeague> => {
    const cached = await getHashDataByField<TeamsByLeague>(FOOTBALL_TEAMS_PER_LEAGUE_CACHE_KEY, String(leagueId));

    if (cached) {
        return cached;
    }

    const teamResponse = await footballRepository.getTeamsByLeague(leagueId);
    await setHashData(FOOTBALL_TEAMS_PER_LEAGUE_CACHE_KEY, String(leagueId), teamResponse);

    return teamResponse;
};
