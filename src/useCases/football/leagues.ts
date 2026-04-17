import { FOOTBALL_LEAGUES_CACHE_KEY } from "../../constants/football.ts";
import type { LeagueDetails } from "../../interfaces/football/leagues.ts";
import { footballRepository } from "../../repositories/football.ts";
import { getHashDataByField, setHashData } from "../../repositories/redisRepository.ts";

export const getLeaguesUseCase = async (countryId: Number = -1 ) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_LEAGUES_CACHE_KEY, countryId.toString());
        let leaguesList: { leagues: LeagueDetails[] }  = cachedData as { leagues: LeagueDetails[] } || null;

        if (leaguesList) {
            return leaguesList; 
        }

         const leaguesResponse = await footballRepository.getLeagues(countryId);

        leaguesList = {
            leagues: [...leaguesResponse]
        }
        await setHashData(FOOTBALL_LEAGUES_CACHE_KEY, countryId.toString(), leaguesList);


        return leaguesList; 
    } catch (error) {
        throw new Error(`Error fetching leagues: ${error}`);
    }
}

/* possible parameters for filtering leagues
{
    "id": number,
    "name": string, => "Premier League"
    "country": string, => "England"
    "code": string, => "GB" 
    "type": string, => "League"
    "season": number => 2020
    "team": number => team id
    "search": string => "search term" name or country,
    "current": boolean => true/false => Return the list of active seasons or the last one of each competition
    "last": number => returns last 'n' leagues
}

You can use these parameters to filter the leagues as needed.
*/