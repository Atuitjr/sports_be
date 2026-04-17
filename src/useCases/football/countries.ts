import { FOOTBALL_CACHE_TTL, FOOTBALL_COUNTRIES_CACHE_KEY } from "../../constants/football.ts";
import type { Country, CountryId } from "../../interfaces/football/countries.ts";
import { footballRepository } from "../../repositories/football.ts";
import { getCachedDataByKey, setCachedData } from "../../repositories/redisRepository.ts";
import { filterCountriesById } from "../../utils/utils.ts";

export const getCountriesUseCase = async (countryId: CountryId = null) => {
    try {
        const cachedData = await getCachedDataByKey(FOOTBALL_COUNTRIES_CACHE_KEY);
        let countriesList: { countries: Country[] } | null = cachedData || null;

        if (countriesList) {
            return filterCountriesById(countriesList.countries, countryId);
        }

        const countriesResponse: Country[] = await footballRepository.getCountries();
        countriesList = {
            countries: [...countriesResponse]
        }

        await setCachedData(FOOTBALL_COUNTRIES_CACHE_KEY, countriesList, FOOTBALL_CACHE_TTL);

        return filterCountriesById(countriesList.countries, countryId);
    } catch (error) {
        throw new Error(`Error fetching countries: ${error}`);
    }
}