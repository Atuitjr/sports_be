import { FOOTBALL_PLAYERS_CACHE_KEY } from '../../constants/football.js';
import type { PlayerId, PlayerInfo } from '../../interfaces/football/player.js';
import { footballRepository } from '../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../repositories/redisRepository.js';

export const getPlayerUseCase = async (playerId: PlayerId): Promise<PlayerInfo> => {
    const cached = await getHashDataByField<PlayerInfo>(FOOTBALL_PLAYERS_CACHE_KEY, String(playerId));

    if (cached) {
        return cached;
    }

    const playerResponse = await footballRepository.getPlayerInfo(playerId);
    await setHashData(FOOTBALL_PLAYERS_CACHE_KEY, String(playerId), playerResponse);

    return playerResponse;
};
