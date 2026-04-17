import { Router } from 'express';
import { footballControllers } from '../../controllers/football/index.ts';

const router = Router();

router.get('/countries', footballControllers.getCountriesController);
router.get('/seasons', footballControllers.getSeasonsController);
router.get('/leagues', footballControllers.getLeaguesController);
router.get('/standings', footballControllers.getStandingsController);
router.get('/team', footballControllers.getTeamsController);
router.get('/player', footballControllers.getPlayerController);
router.get('/pichichi', footballControllers.getPichichiController);
router.get('/matches/competition', footballControllers.getMatchesByCompetitionController);
router.get('/matches/team', footballControllers.getMatchesByTeamController);
router.get('/matches', footballControllers.getMatchController);

export { router as footballRoutes };