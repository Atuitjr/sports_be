import type { LeaguesRequest } from "../../interfaces/football/leagues.ts";
import { getLeaguesUseCase } from "../../useCases/football/leagues.ts";

export const getLeaguesController = async (req: LeaguesRequest, res: any) => {
    try {
        const headers = req.headers;
        const { countryid } = headers;

        if(!countryid){
            res.status(400).json({ error: 'Bad Request',  message: 'Country ID is missing in headers'  });
            return;
        }

        const leaguesList= await getLeaguesUseCase(Number(countryid || "-1"));
        
        res.status(200).json({ leagues: leaguesList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};