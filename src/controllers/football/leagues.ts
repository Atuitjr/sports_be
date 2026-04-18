import type { Response } from 'express';
import type { LeaguesRequest } from '../../interfaces/football/leagues.js';
import { getLeaguesUseCase } from '../../useCases/football/leagues.js';

export const getLeaguesController = async (req: LeaguesRequest, res: Response): Promise<void> => {
    const { countryId } = req.query;

    if (countryId === undefined) {
        res.status(400).json({ error: 'countryId query param is required' });
        return;
    }

    const parsed = parseInt(countryId, 10);
    if (isNaN(parsed)) {
        res.status(400).json({ error: 'countryId must be a valid number' });
        return;
    }

    const leagues = await getLeaguesUseCase(parsed);
    res.status(200).json(leagues);
};
