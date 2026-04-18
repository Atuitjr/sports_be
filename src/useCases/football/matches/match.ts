import type { Match } from '../../../interfaces/football/matches.js';
import { FOOTBALL_MATCH_CACHE_KEY } from '../../../constants/football.js';
import { footballRepository } from '../../../repositories/football.js';
import { getHashDataByField, setHashData } from '../../../repositories/redisRepository.js';

export const getMatchUseCase = async (matchId: number): Promise<Match> => {
    const cached = await getHashDataByField<Match>(FOOTBALL_MATCH_CACHE_KEY, String(matchId));

    if (cached) {
        return cached;
    }

    const matchResponse = await footballRepository.getMatch(matchId);
    await setHashData(FOOTBALL_MATCH_CACHE_KEY, String(matchId), matchResponse);

    return matchResponse;
};
