import type { Request } from 'express';
import type { TeamInfo } from './teams.js';

export type PlayerId = number;

export interface PlayersRequest extends Request {
    query: Request['query'] & { playerId?: string };
}

type CurrentTeamInfo = Partial<TeamInfo>;

export interface PlayerInfo {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    position: string;
    shirtNumber: number;
    lastUpdated: string;
    currentTeam: CurrentTeamInfo;
}
