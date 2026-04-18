import type { Response } from 'express';
import type { MatchesRequest, MatchPerCompetition } from '../../../interfaces/football/matches.js';
import { getMatchesPerCompetitionUseCase } from '../../../useCases/football/matches/competition.js';

export const getMatchesByCompetitionController = async (req: MatchesRequest, res: Response): Promise<void> => {
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

    const matches: MatchPerCompetition = await getMatchesPerCompetitionUseCase(parsed);
    res.status(200).json(matches);
};
