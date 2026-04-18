import type { Request, Response } from 'express';
import { getSeasonsUseCase } from '../../useCases/football/seasons.js';

export const getSeasonsController = async (_req: Request, res: Response): Promise<void> => {
    const seasons: number[] = await getSeasonsUseCase();
    res.status(200).json({ seasons });
};
