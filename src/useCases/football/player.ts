import { FOOTBALL_PLAYERS_CACHE_KEY } from "../../constants/football.ts";
import type { PlayerId, PlayerInfo } from "../../interfaces/football/player.ts";
import { footballRepository } from "../../repositories/football.ts";
import { getHashDataByField, setHashData } from "../../repositories/redisRepository.ts";

export const getPlayerUseCase = async (playerId: PlayerId) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_PLAYERS_CACHE_KEY, playerId.toString());
        let playerInfo: { player: PlayerInfo } | null = cachedData as { player: PlayerInfo } || null;

        if(playerInfo) {
            return playerInfo.player;
        }

        const playerResponse: PlayerInfo = await footballRepository.getPlayerInfo(playerId);
        playerInfo = {
            player: playerResponse
        }

        await setHashData(FOOTBALL_PLAYERS_CACHE_KEY, playerId.toString(), playerInfo);

        return playerInfo.player;
    } catch (error) {
        throw new Error(`Error fetching player: ${error}`);
    }
}