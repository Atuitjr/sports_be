import type { Response } from 'express';
import type { MatchesRequest, Match } from '../../../interfaces/football/matches.js';
import { getMatchUseCase } from '../../../useCases/football/matches/match.js';

export const getMatchController = async (req: MatchesRequest, res: Response): Promise<void> => {
    const { matchId } = req.query;

    if (matchId === undefined) {
        res.status(400).json({ error: 'matchId query param is required' });
        return;
    }

    const parsed = parseInt(matchId, 10);
    if (isNaN(parsed)) {
        res.status(400).json({ error: 'matchId must be a valid number' });
        return;
    }

    const match: Match = await getMatchUseCase(parsed);
    res.status(200).json({ match });
};
