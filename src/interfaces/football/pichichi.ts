import type { PlayerInfo } from "./player.js";
import type { Competition, Season } from "./standings.js";
import type { TeamsList } from "./teams.js";

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