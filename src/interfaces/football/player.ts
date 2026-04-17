import type { TeamInfo } from "./teams.ts";

export type PlayerId  = number;

export interface PlayersRequest extends Request {
    headers: Request["headers"] & { playerid?: PlayerId };
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