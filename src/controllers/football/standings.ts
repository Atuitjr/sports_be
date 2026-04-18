import type { Response } from 'express';
import type { standingsDetails, StandingsRequest } from '../../interfaces/football/standings.js';
import { getStandingsUseCase } from '../../useCases/football/standings.js';

export const getStandingsController = async (req: StandingsRequest, res: Response): Promise<void> => {
    const { leagueId } = req.query;

    if (leagueId === undefined) {
        res.status(400).json({ error: 'leagueId query param is required' });
        return;
    }

    const parsed = parseInt(leagueId, 10);
    if (isNaN(parsed)) {
        res.status(400).json({ error: 'leagueId must be a valid number' });
        return;
    }

    const standings: standingsDetails[] = await getStandingsUseCase(parsed);
    res.status(200).json({ standings });
};
