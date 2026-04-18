import type { Response } from 'express';
import type { TeamInfo, TeamsRequest } from '../../interfaces/football/teams.js';
import { getTeamsByLeagueUseCase, getTeamsUseCase } from '../../useCases/football/teams.js';

export const getTeamsController = async (req: TeamsRequest, res: Response): Promise<void> => {
    const { teamId, leagueId } = req.query;

    if (leagueId !== undefined) {
        const parsed = parseInt(leagueId, 10);
        if (isNaN(parsed)) {
            res.status(400).json({ error: 'leagueId must be a valid number' });
            return;
        }
        const teams = await getTeamsByLeagueUseCase(parsed);
        res.status(200).json({ teams });
        return;
    }

    if (teamId === undefined) {
        res.status(400).json({ error: 'teamId or leagueId query param is required' });
        return;
    }

    const parsed = parseInt(teamId, 10);
    if (isNaN(parsed)) {
        res.status(400).json({ error: 'teamId must be a valid number' });
        return;
    }

    const team: TeamInfo = await getTeamsUseCase(parsed);
    res.status(200).json(team);
};
