import { FOOTBALL_PICHICHI_CACHE_KEY } from "../../constants/football.ts";
import type { Pichichi } from "../../interfaces/football/pichichi.ts";
import { footballRepository } from "../../repositories/football.ts";
import {  getHashDataByField, setHashData } from "../../repositories/redisRepository.ts";

export const getPichichiUseCase = async (leagueId: Number = -1) => {
    try {
        const cachedData = await getHashDataByField(FOOTBALL_PICHICHI_CACHE_KEY, leagueId.toString());
        let pichichisList: { pichichi: Pichichi } | null = cachedData as { pichichi: Pichichi } || null;

        if (pichichisList) {
            return pichichisList.pichichi
        }

        const pichichiResponse: Pichichi = await footballRepository.getPichichi(leagueId ?? -1);
        pichichisList = {
            pichichi: {...pichichiResponse}
        }

        await setHashData(FOOTBALL_PICHICHI_CACHE_KEY, leagueId?.toString(),  pichichisList);

        return pichichisList.pichichi;
    } catch (error) {
        throw new Error(`Error fetching pichichi: ${error}`);
    }
}