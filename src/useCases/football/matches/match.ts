import type { Match } from "../../../interfaces/football/matches.ts";
import { FOOTBALL_MATCH_CACHE_KEY } from "../../../constants/football.ts";
import { footballRepository } from "../../../repositories/football.ts";
import {  getHashDataByField, setHashData } from "../../../repositories/redisRepository.ts";

export const getMatchUseCase = async (matchId: Number) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_MATCH_CACHE_KEY, matchId.toString());
        let matchesList: { matches: Match } | null = cachedData as { matches: Match } || null;

        if (matchesList) {
            return matchesList.matches
        }

        const matchesResponse: Match = await footballRepository.getMatch(matchId);
        matchesList = {
            matches: {...matchesResponse}
        }

        await setHashData(FOOTBALL_MATCH_CACHE_KEY, matchId?.toString(),  matchesList);

        return matchesList.matches;
    } catch (error) {
        throw new Error(`Error fetching match: ${error}`);
    }
}