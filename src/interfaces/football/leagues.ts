import type { Request } from 'express';
import type { CountryId } from './countries.js';

export interface LeaguesRequest extends Request {
    query: Request['query'] & { countryId?: string };
}

export interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
}

interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: string;
}

interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: Team | null;
}

export interface LeagueDetails {
    id: number;
    area: Area;
    name: string;
    code: string;
    emblem: string;
    plan: string;
    currentSeason: Season | null;
    numberOfAvailableSeasons: number;
    lastUpdated: string;
}

export type { CountryId };
