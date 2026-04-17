import type { PlayerInfo, PlayersRequest } from "../../interfaces/football/player.ts";
import { getPlayerUseCase } from "../../useCases/football/player.ts";



export const getPlayerController = async (req: PlayersRequest, res: any) => {
    try {
        
        const headers = req.headers;
        const { playerid } = headers;

        if (!playerid) {
            res.status(400).json({ error: 'Bad Request',  message: 'playerId header is required' });
            return;
        }

        const playerInfo: PlayerInfo = await getPlayerUseCase(Number(playerid));
        
        res.status(200).json({ player: playerInfo });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};