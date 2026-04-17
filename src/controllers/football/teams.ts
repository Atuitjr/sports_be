import type { TeamInfo, TeamsRequest } from "../../interfaces/football/teams.ts";
import { getTeamsByLeagueUseCase, getTeamsUseCase } from "../../useCases/football/teams.ts";



export const getTeamsController = async (req: TeamsRequest, res: any) => {
    try {
        
        const headers = req.headers;
        const { teamid, leagueid } = headers;

        if(leagueid) {
            const teamsList = await getTeamsByLeagueUseCase(Number(leagueid));
            res.status(200).json({ teams: teamsList });
            return;
        }

        if (!teamid) {
            res.status(400).json({ error: 'Bad Request',  message: 'teamid header is required' });
            return;
        }

        const teamInfo: TeamInfo = await getTeamsUseCase(Number(teamid));
        
        res.status(200).json({ team: teamInfo });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};