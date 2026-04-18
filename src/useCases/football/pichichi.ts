import { FOOTBALL_PICHICHI_CACHE_KEY } from '../../constants/football.js';
import type { Pichichi } from '../../interfaces/football/pichichi.js';
import { footballRepository } from '../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../repositories/redisRepository.js';

export const getPichichiUseCase = async (leagueId: number): Promise<Pichichi> => {
    const cached = await getHashDataByField<Pichichi>(FOOTBALL_PICHICHI_CACHE_KEY, String(leagueId));

    if (cached) {
        return cached;
    }

    const pichichiResponse = await footballRepository.getPichichi(leagueId);
    await setHashData(FOOTBALL_PICHICHI_CACHE_KEY, String(leagueId), pichichiResponse);

    return pichichiResponse;
};
