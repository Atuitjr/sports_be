import {getCountriesController} from  './countries.ts'
import { getSeasonsController } from './seasons.ts';
import { getLeaguesController } from './leagues.ts';
import { getStandingsController } from './standings.ts';
import { getTeamsController } from './teams.ts';
import { getPlayerController } from './player.ts';
import { getPichichiController } from './pichichi.ts';
import { getMatchesByCompetitionController } from './matches/competition.ts';
import { getMatchesByTeamController } from './matches/team.ts';
import { getMatchController } from './matches/match.ts';

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
    getMatchController
} ;