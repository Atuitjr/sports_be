import type { Response } from 'express';
import type { MatchesRequest, MatchesPerTeam } from '../../../interfaces/football/matches.js';
import { getMatchesPerTeamUseCase } from '../../../useCases/football/matches/team.js';

export const getMatchesByTeamController = async (req: MatchesRequest, res: Response): Promise<void> => {
    const { teamId } = req.query;

    if (teamId === undefined) {
        res.status(400).json({ error: 'teamId query param is required' });
        return;
    }

    const parsed = parseInt(teamId, 10);
    if (isNaN(parsed)) {
        res.status(400).json({ error: 'teamId must be a valid number' });
        return;
    }

    const matches: MatchesPerTeam = await getMatchesPerTeamUseCase(parsed);
    res.status(200).json(matches);
};
