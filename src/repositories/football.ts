import type { Country } from "../interfaces/football/countries.ts";
import type { LeagueDetails } from "../interfaces/football/leagues.ts";
import apiClient from "../lib/axios.ts";
import type { standingsDetails } from "../interfaces/football/standings.ts";
import type { TeamInfo, TeamsByLeague } from "../interfaces/football/teams.ts";
import type { PlayerInfo } from "../interfaces/football/player.ts";
import type { Pichichi } from "../interfaces/football/pichichi.ts";
import type { Match, MatchesPerTeam, MatchPerCompetition } from "../interfaces/football/matches.ts";

export const footballRepository = {
    getCountries: async (): Promise<Country[]> => {
        try{
            console.log("Getting data for the areas")
            const response =  await apiClient.get('/areas');
            return response.data.areas as Country[];
        } catch (error) {
            throw new Error(`Error fetching countries from API: ${error}`);
        }
    },

    getSeasons: async (): Promise<number[]> => {
        try{
            const response =  await apiClient.get('/leagues/seasons');
            return response.data.response as number[];
        } catch (error) {
            throw new Error(`Error fetching seasons from API: ${error}`);
        }  
    },

    getLeagues: async (countryId: Number): Promise<LeagueDetails[]> => {
        try{
            console.log(`Calling leagues with ${countryId} as its countryId`)
            const response =  await apiClient.get(`/competitions?areas=${countryId}`);
            return response.data.competitions as LeagueDetails[];
        } catch (error) {
            throw new Error(`Error fetching leagues from API: ${error}`);
        }
    },

    getStandings: async (leagueId: Number): Promise<standingsDetails[]> => {
        try{
            console.log(`Calling standings with ${leagueId} as its leagueId`)
            const response =  await apiClient.get(`/competitions/${leagueId}/standings`);
            return response.data as standingsDetails[];
        } catch (error) {
            throw new Error(`Error fetching standings from API: ${error}`);
        }
    },

    getTeamInfo: async (teamId: Number): Promise<TeamInfo> => {
        try{
            console.log(`Calling team info with ${teamId} as its teamId`)
            const response =  await apiClient.get(`/teams/${teamId}`);
            return response.data as TeamInfo;
        } catch (error) {
            throw new Error(`Error fetching team info from API: ${error}`);
        }
    } ,

    getPlayerInfo: async (playerId: Number): Promise<PlayerInfo> => {
        try{
            console.log(`Calling player info with ${playerId} as its playerId`)
            const response =  await apiClient.get(`/persons/${playerId}`);
            return response.data as PlayerInfo;
        } catch (error) {
            throw new Error(`Error fetching player info from API: ${error}`);
        }
    },

    getPichichi: async (leagueId: Number): Promise<Pichichi> => {
        try{
            console.log(`Calling pichichi with ${leagueId} as its leagueId`)
            const response =  await apiClient.get(`/competitions/${leagueId}/scorers`);
            return response.data as Pichichi;
        } catch (error) {
            throw new Error(`Error fetching pichichi from API: ${error}`);
        }
    },

    getMatchesPerCompetition: async (leagueId: Number): Promise<MatchPerCompetition> => {
        try{
            console.log(`Calling matches per competition with ${leagueId} as its leagueId`)
            const response =  await apiClient.get(`/competitions/${leagueId}/matches`);
            return response.data as MatchPerCompetition;
        } catch (error) {
            throw new Error(`Error fetching matches per competition from API: ${error}`);
        }
    },

    getTeamsByLeague: async (leagueId: Number): Promise<TeamsByLeague> => {
        try{
            console.log(`Calling teams by league with ${leagueId} as its leagueId`)
            const response =  await apiClient.get(`/competitions/${leagueId}/teams`);
            return response.data as TeamsByLeague;
        } catch (error) {
            throw new Error(`Error fetching teams by league from API: ${error}`);
        }
    },

    getMatchesPerTeam: async (teamId: Number): Promise<MatchesPerTeam> => {
        try{
            console.log(`Calling matches per team with ${teamId} as its teamId`)
            const response =  await apiClient.get(`/teams/${teamId}/matches`);
            return response.data.matches as MatchesPerTeam;
        } catch (error) {
            throw new Error(`Error fetching matches per team from API: ${error}`);
        }
    },

    getMatch: async (matchId: Number): Promise<Match> => {
        try{
            console.log(`Calling match with ${matchId} as its matchId`)
            const response =  await apiClient.get(`/matches/${matchId}`);
            return response.data as Match;
        } catch (error) {
            throw new Error(`Error fetching match from API: ${error}`);
        }
    },
}