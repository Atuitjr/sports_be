import type { Area } from "./leagues.ts";

interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
}


interface StandingTableEntry {
    position: number;
    team: Team;
    playedGames: number;
    form: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsAgainst: number;
    goalsFor: number;
    goalDifference: number;
}


interface Standing {
    stage: string;
    type: string;
    group: string;
    table: StandingTableEntry[];
}

export type Competition = {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export type Season = {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: Team | null;
    stages: string[];
}

export interface standingsDetails {
    area : Area;
    competition: Competition;
    season: Season;
    standings: Standing[];
}

export type leagueId = number;

export interface StandingsRequest extends Request {
    headers: Request["headers"] & { leagueid: leagueId };
}
