import type { Area } from "./leagues.ts";
import type { Competition, leagueId, Season } from "./standings.ts";

export  interface Country {
    id: number;
    name: string;
    code: string;
    flag: string;
    parentAreaId: number;
    parentArea: string;
    childAreas?: Country[];
}

export type TeamId  = number;

export interface TeamsRequest extends Request {
    headers: Request["headers"] & { teamid?: TeamId, leagueid?: leagueId };
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
    contract : {
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
    contract : {
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
    dateOfBirth: string
}

export interface TeamInfo extends TeamsList{
    area: Area;
    runningCompetitions: Competition[];
    coach: Coach;
    marketValue: string;
    squad: SquadMember[];
    staff : StaffMember[];
    contract ?: {
        start: string;
        until: string;
    }
}

export interface TeamsByLeague {
    competition: Competition;
    season: Season
    teams: (TeamsList &  {
        area: Area;
        runningCompetitions: Competition[];
        coach: Coach;
        marketValue: string | null;
        squad: SquadMember[];
        staff : StaffMember[];
    }) [];
}