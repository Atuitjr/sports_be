import { FOOTBALL_TEAMS_CACHE_KEY, FOOTBALL_TEAMS_PER_LEAGUE_CACHE_KEY } from "../../constants/football.ts";
import type { TeamId, TeamInfo, TeamsByLeague } from "../../interfaces/football/teams.ts";
import { footballRepository } from "../../repositories/football.ts";
import { getHashDataByField, setHashData } from "../../repositories/redisRepository.ts";

export const getTeamsUseCase = async (teamId: TeamId) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_TEAMS_CACHE_KEY, teamId.toString());
        let teamsInfo: { team: TeamInfo } | null = cachedData as { team: TeamInfo } || null;

        if(teamsInfo) {
            return teamsInfo.team;
        }

        const teamResponse: TeamInfo = await footballRepository.getTeamInfo(teamId);
        teamsInfo = {
            team: teamResponse
        }

        await setHashData(FOOTBALL_TEAMS_CACHE_KEY, teamId.toString(), teamsInfo);

        return teamsInfo.team;
    } catch (error) {
        throw new Error(`Error fetching team: ${error}`);
    }
}

export const getTeamsByLeagueUseCase = async (leagueId: Number) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_TEAMS_PER_LEAGUE_CACHE_KEY, leagueId.toString());
        let teamsInfo: { teams: TeamsByLeague } | null = cachedData as { teams: TeamsByLeague } || null;

        if(teamsInfo) {
            return teamsInfo.teams;
        }

        const teamResponse: TeamsByLeague = await footballRepository.getTeamsByLeague(leagueId);
        teamsInfo = {
            teams: teamResponse
        }

        await setHashData(FOOTBALL_TEAMS_PER_LEAGUE_CACHE_KEY, leagueId.toString(), teamsInfo);

        return teamsInfo.teams;
    } catch (error) {
        throw new Error(`Error fetching teams by league: ${error}`);
    }
}