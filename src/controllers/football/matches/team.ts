import type { MatchesPerTeam, MatchesRequest } from "../../../interfaces/football/matches.ts";
import { getMatchesPerTeamUseCase } from "../../../useCases/football/matches/team.ts";


export const getMatchesByTeamController = async (req: MatchesRequest, res: any) => {
    try {
        const headers = req.headers;
        const { teamid } = headers;

        if (!teamid) {
            res.status(400).json({ error: 'Bad Request',  message: 'teamid header is required' });
            return;
        }

        const matchesList: MatchesPerTeam = await getMatchesPerTeamUseCase(Number(teamid));
        
        res.status(200).json({ matches: matchesList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};