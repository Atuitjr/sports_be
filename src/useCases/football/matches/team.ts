import type { MatchesPerTeam } from "../../../interfaces/football/matches.ts";
import { FOOTBALL_MATCHES_PER_TEAM_CACHE_KEY } from "../../../constants/football.ts";
import { footballRepository } from "../../../repositories/football.ts";
import {  getHashDataByField, setHashData } from "../../../repositories/redisRepository.ts";

export const getMatchesPerTeamUseCase = async (teamId: Number) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_MATCHES_PER_TEAM_CACHE_KEY, teamId.toString());
        let matchesList: { matches: MatchesPerTeam } | null = cachedData as { matches: MatchesPerTeam } || null;

        if (matchesList) {
            return matchesList.matches
        }

        const matchesResponse: MatchesPerTeam = await footballRepository.getMatchesPerTeam(teamId);
        matchesList = {
            matches: {...matchesResponse}
        }

        await setHashData(FOOTBALL_MATCHES_PER_TEAM_CACHE_KEY, teamId?.toString(),  matchesList);

        return matchesList.matches;
    } catch (error) {
        throw new Error(`Error fetching matches per team: ${error}`);
    }
}