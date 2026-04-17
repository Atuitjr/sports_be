import { getSeasonsUseCase } from "../../useCases/football/seasons.ts";

export const getSeasonsController = async (_: Request, res: any) => {
    try {
        const seasonsList: Number[] = await getSeasonsUseCase();
        
        res.status(200).json({ seasons: seasonsList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};