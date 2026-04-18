import type { Response } from 'express';
import type { StandingsRequest } from '../../interfaces/football/standings.js';
import type { Pichichi } from '../../interfaces/football/pichichi.js';
import { getPichichiUseCase } from '../../useCases/football/pichichi.js';

export const getPichichiController = async (req: StandingsRequest, res: Response): Promise<void> => {
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

    const pichichi: Pichichi = await getPichichiUseCase(parsed);
    res.status(200).json(pichichi);
};
