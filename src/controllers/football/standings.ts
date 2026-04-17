import type { standingsDetails, StandingsRequest } from "../../interfaces/football/standings.ts";
import { getStandingsUseCase } from "../../useCases/football/standings.ts";



export const getStandingsController = async (req: StandingsRequest, res: any) => {
    try {
        //! Add new headers / parameters for filter  [matchday, season, date]
        const headers = req.headers;
        const { leagueid } = headers;

        if (!leagueid) {
            res.status(400).json({ error: 'Bad Request',  message: 'leagueid header is required' });
            return;
        }

        const standingsList: standingsDetails[] = await getStandingsUseCase(Number(leagueid || "-1"));
        
        res.status(200).json({ standings: standingsList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};