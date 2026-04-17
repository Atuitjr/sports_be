import { FOOTBALL_STANDINGS_CACHE_KEY } from "../../constants/football.ts";
import type { standingsDetails } from "../../interfaces/football/standings.ts";
import { footballRepository } from "../../repositories/football.ts";
import {  getHashDataByField, setHashData } from "../../repositories/redisRepository.ts";

export const getStandingsUseCase = async (leagueId: Number = -1) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_STANDINGS_CACHE_KEY, leagueId.toString());
        let standingsList: { standings: standingsDetails[] } | null = cachedData as { standings: standingsDetails[] } || null;

        if (standingsList) {
            return standingsList.standings
        }

        const standingsResponse: standingsDetails[] = await footballRepository.getStandings(leagueId ?? -1);
        standingsList = {
            standings: {...standingsResponse}
        }

        await setHashData(FOOTBALL_STANDINGS_CACHE_KEY, leagueId?.toString(),  standingsList);

        return standingsList.standings;
    } catch (error) {
        throw new Error(`Error fetching standings: ${error}`);
    }
}