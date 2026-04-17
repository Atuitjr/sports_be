import type { Match, MatchesRequest } from "../../../interfaces/football/matches.ts";
import { getMatchUseCase } from "../../../useCases/football/matches/match.ts";


export const getMatchController = async (req: MatchesRequest, res: any) => {
    try {
        const headers = req.headers;
        const { matchid } = headers;

        if (!matchid) {
            res.status(400).json({ error: 'Bad Request',  message: 'matchid header is required' });
            return;
        }

        const matchesList: Match = await getMatchUseCase(Number(matchid));
        
        res.status(200).json({ matches: matchesList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};