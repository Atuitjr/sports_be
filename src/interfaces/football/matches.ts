import type { Request } from 'express';
import type { Area } from './leagues.js';
import type { Competition, Season } from './standings.js';
import type { TeamId } from './teams.js';
import type { leagueId } from './standings.js';

type MatchId = number;

export interface MatchesRequest extends Request {
    query: Request['query'] & { leagueId?: string; teamId?: string; matchId?: string };
}

type ResultSet = {
    count: number;
    first: string;
    last: string;
    played: number;
}

type CoachInfo = {
    id: number;
    name: string;
    nationality: string;
}

type PlayerInfoMatch = {
    player: { id: number; name: string };
    team: { id: number; name: string };
}

type TeamInfoMatch = {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    coach: CoachInfo;
    leagueRank: number;
    formation: string | null;
    lineup: string[] | null;
    bench: string[] | null;
}

type Score = {
    winner: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW';
    duration: string;
    fullTime: { homeTeam: number | null; awayTeam: number | null };
    halfTime: { homeTeam: number | null; awayTeam: number | null };
}

type Goal = {
    minute: number;
    injuryTime: number | null;
    type: string;
    team: { id: number; name: string };
    scorer: { id: number; name: string };
    assist: { id: number; name: string } | null;
    score: { homeTeam: number; awayTeam: number };
}

type Penalties = PlayerInfoMatch & { scored: boolean }

type Odds = { homeWin: number | null; draw: number | null; awayWin: number | null }

type Referee = { id: number; name: string; type: string; nationality: string }

export interface Match {
    area: Area;
    competition: Competition;
    season: Season;
    id: number;
    utcDate: string;
    status: string;
    minute: string | null;
    injuryTime: number;
    attendance: number | null;
    matchday: number;
    stage: string;
    group: string | null;
    lastUpdated: string;
    homeTeam: TeamInfoMatch;
    awayTeam: TeamInfoMatch;
    score: Score;
    goals: Goal[];
    penalties: Penalties[];
    bookings: (PlayerInfoMatch & { card: 'YELLOW_CARD' | 'RED_CARD'; minute: number })[];
    substitutions: (PlayerInfoMatch & { minute: number; type: 'IN' | 'OUT' })[];
    odds: Odds | null;
    referees: Referee[];
}

export interface MatchPerCompetition {
    resultSet: ResultSet;
    competition: Competition;
    matches: Match[];
}

export interface MatchesPerTeam {
    matches: Match[];
}

export type { TeamId, leagueId, MatchId };
