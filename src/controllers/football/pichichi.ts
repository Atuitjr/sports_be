import type { Pichichi } from "../../interfaces/football/pichichi.ts";
import type { StandingsRequest } from "../../interfaces/football/standings.ts";
import { getPichichiUseCase } from "../../useCases/football/pichichi.ts";


export const getPichichiController = async (req: StandingsRequest, res: any) => {
    try {
        const headers = req.headers;
        const { leagueid } = headers;

        if (!leagueid) {
            res.status(400).json({ error: 'Bad Request',  message: 'leagueid header is required' });
            return;
        }

        const pichichiList: Pichichi = await getPichichiUseCase(Number(leagueid));
        
        res.status(200).json({ pichichi: pichichiList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};