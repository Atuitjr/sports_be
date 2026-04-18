import type { Response } from 'express';
import type { PlayerInfo, PlayersRequest } from '../../interfaces/football/player.js';
import { getPlayerUseCase } from '../../useCases/football/player.js';

export const getPlayerController = async (req: PlayersRequest, res: Response): Promise<void> => {
    const { playerId } = req.query;

    if (playerId === undefined) {
        res.status(400).json({ error: 'playerId query param is required' });
        return;
    }

    const parsed = parseInt(playerId, 10);
    if (isNaN(parsed)) {
        res.status(400).json({ error: 'playerId must be a valid number' });
        return;
    }

    const player: PlayerInfo = await getPlayerUseCase(parsed);
    res.status(200).json(player);
};
