import type { Request } from 'express';
import type { Area } from './leagues.js';
import type { Competition, leagueId, Season } from './standings.js';
import type { Country } from './countries.js';

export type { Country };

export type TeamId = number;

export interface TeamsRequest extends Request {
    query: Request['query'] & { teamId?: string; leagueId?: string };
}

export type TeamsList = {
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

interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    contract: {
        start: string;
        until: string;
    }
}

interface SquadMember {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    position: string;
    dateOfBirth: string;
    nationality: string;
    shirtNumber: number;
    marketValue: string;
    contract: {
        start: string;
        until: string;
    }
}

interface StaffMember {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    role: string;
    dateOfBirth: string;
}

export interface TeamInfo extends TeamsList {
    area: Area;
    runningCompetitions: Competition[];
    coach: Coach;
    marketValue: string;
    squad: SquadMember[];
    staff: StaffMember[];
    contract?: {
        start: string;
        until: string;
    }
}

export interface TeamsByLeague {
    competition: Competition;
    season: Season;
    teams: (TeamsList & {
        area: Area;
        runningCompetitions: Competition[];
        coach: Coach;
        marketValue: string | null;
        squad: SquadMember[];
        staff: StaffMember[];
    })[];
}

export type { leagueId };
