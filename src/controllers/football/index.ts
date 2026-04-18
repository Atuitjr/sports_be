import { getCountriesController } from './countries.js';
import { getSeasonsController } from './seasons.js';
import { getLeaguesController } from './leagues.js';
import { getStandingsController } from './standings.js';
import { getTeamsController } from './teams.js';
import { getPlayerController } from './player.js';
import { getPichichiController } from './pichichi.js';
import { getMatchesByCompetitionController } from './matches/competition.js';
import { getMatchesByTeamController } from './matches/team.js';
import { getMatchController } from './matches/match.js';

export const footballControllers = {
    getCountriesController,
    getSeasonsController,
    getLeaguesController,
    getStandingsController,
    getTeamsController,
    getPlayerController,
    getPichichiController,
    getMatchesByCompetitionController,
    getMatchesByTeamController,
    getMatchController,
};
