import type { MatchesRequest, MatchPerCompetition } from "../../../interfaces/football/matches.ts";
import { getMatchesPerCompetitionUseCase } from "../../../useCases/football/matches/competition.ts";


export const getMatchesByCompetitionController = async (req: MatchesRequest, res: any) => {
    try {
        const headers = req.headers;
        const { leagueid } = headers;

        if (!leagueid) {
            res.status(400).json({ error: 'Bad Request',  message: 'leagueid header is required' });
            return;
        }

        const matchesList: MatchPerCompetition = await getMatchesPerCompetitionUseCase(Number(leagueid));
        
        res.status(200).json({ matches: matchesList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};