import type { MatchPerCompetition } from "../../../interfaces/football/matches.ts";
import { FOOTBALL_MATCHES_PER_COMPETITION_CACHE_KEY } from "../../../constants/football.ts";
import { footballRepository } from "../../../repositories/football.ts";
import {  getHashDataByField, setHashData } from "../../../repositories/redisRepository.ts";

export const getMatchesPerCompetitionUseCase = async (leagueId: Number) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_MATCHES_PER_COMPETITION_CACHE_KEY, leagueId.toString());
        let matchesList: { matches: MatchPerCompetition } | null = cachedData as { matches: MatchPerCompetition } || null;

        if (matchesList) {
            return matchesList.matches
        }

        const matchesResponse: MatchPerCompetition = await footballRepository.getMatchesPerCompetition(leagueId);
        matchesList = {
            matches: {...matchesResponse}
        }

        await setHashData(FOOTBALL_MATCHES_PER_COMPETITION_CACHE_KEY, leagueId?.toString(),  matchesList);

        return matchesList.matches;
    } catch (error) {
        throw new Error(`Error fetching matches per competition: ${error}`);
    }
}