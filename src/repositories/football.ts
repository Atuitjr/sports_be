import type { Country } from '../interfaces/football/countries.js';
import type { LeagueDetails } from '../interfaces/football/leagues.js';
import apiClient from '../lib/axios.js';
import { logger } from '../lib/logger.js';
import type { standingsDetails } from '../interfaces/football/standings.js';
import type { TeamInfo, TeamsByLeague } from '../interfaces/football/teams.js';
import type { PlayerInfo } from '../interfaces/football/player.js';
import type { Pichichi } from '../interfaces/football/pichichi.js';
import type { Match, MatchesPerTeam, MatchPerCompetition } from '../interfaces/football/matches.js';

const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error(String(err));

export const footballRepository = {
    getCountries: async (): Promise<Country[]> => {
        try {
            logger.debug('Fetching areas');
            const response = await apiClient.get('/areas');
            return response.data.areas as Country[];
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch countries', { message: error.message });
            throw error;
        }
    },

    getSeasons: async (): Promise<number[]> => {
        try {
            const response = await apiClient.get('/leagues/seasons');
            return response.data.response as number[];
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch seasons', { message: error.message });
            throw error;
        }
    },

    getLeagues: async (countryId: number): Promise<LeagueDetails[]> => {
        try {
            logger.debug('Fetching leagues', { countryId });
            const response = await apiClient.get(`/competitions?areas=${countryId}`);
            return response.data.competitions as LeagueDetails[];
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch leagues', { countryId, message: error.message });
            throw error;
        }
    },

    getStandings: async (leagueId: number): Promise<standingsDetails[]> => {
        try {
            logger.debug('Fetching standings', { leagueId });
            const response = await apiClient.get(`/competitions/${leagueId}/standings`);
            return response.data as standingsDetails[];
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch standings', { leagueId, message: error.message });
            throw error;
        }
    },

    getTeamInfo: async (teamId: number): Promise<TeamInfo> => {
        try {
            logger.debug('Fetching team info', { teamId });
            const response = await apiClient.get(`/teams/${teamId}`);
            return response.data as TeamInfo;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch team info', { teamId, message: error.message });
            throw error;
        }
    },

    getPlayerInfo: async (playerId: number): Promise<PlayerInfo> => {
        try {
            logger.debug('Fetching player info', { playerId });
            const response = await apiClient.get(`/persons/${playerId}`);
            return response.data as PlayerInfo;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch player info', { playerId, message: error.message });
            throw error;
        }
    },

    getPichichi: async (leagueId: number): Promise<Pichichi> => {
        try {
            logger.debug('Fetching top scorers', { leagueId });
            const response = await apiClient.get(`/competitions/${leagueId}/scorers`);
            return response.data as Pichichi;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch top scorers', { leagueId, message: error.message });
            throw error;
        }
    },

    getMatchesPerCompetition: async (leagueId: number): Promise<MatchPerCompetition> => {
        try {
            logger.debug('Fetching matches per competition', { leagueId });
            const response = await apiClient.get(`/competitions/${leagueId}/matches`);
            return response.data as MatchPerCompetition;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch matches per competition', { leagueId, message: error.message });
            throw error;
        }
    },

    getTeamsByLeague: async (leagueId: number): Promise<TeamsByLeague> => {
        try {
            logger.debug('Fetching teams by league', { leagueId });
            const response = await apiClient.get(`/competitions/${leagueId}/teams`);
            return response.data as TeamsByLeague;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch teams by league', { leagueId, message: error.message });
            throw error;
        }
    },

    getMatchesPerTeam: async (teamId: number): Promise<MatchesPerTeam> => {
        try {
            logger.debug('Fetching matches per team', { teamId });
            const response = await apiClient.get(`/teams/${teamId}/matches`);
            return response.data.matches as MatchesPerTeam;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch matches per team', { teamId, message: error.message });
            throw error;
        }
    },

    getMatch: async (matchId: number): Promise<Match> => {
        try {
            logger.debug('Fetching match', { matchId });
            const response = await apiClient.get(`/matches/${matchId}`);
            return response.data as Match;
        } catch (err) {
            const error = toError(err);
            logger.error('Failed to fetch match', { matchId, message: error.message });
            throw error;
        }
    },
};
