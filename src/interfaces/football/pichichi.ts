import type { PlayerInfo } from "./player.ts";
import type { Competition, Season } from "./standings.ts";
import type { TeamsList } from "./teams.ts";

type Scorers = {
    player: Exclude<PlayerInfo, "currentTeam">;
    team: TeamsList;
    goals: number;
    assists: number;
    penalties: number;
}


export interface Pichichi {
    competition: Competition;
    season: Season;
    topScorers: Scorers[];
}