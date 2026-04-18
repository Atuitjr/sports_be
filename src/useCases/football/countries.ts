import { FOOTBALL_CACHE_TTL, FOOTBALL_COUNTRIES_CACHE_KEY } from '../../constants/football.js';
import type { Country, CountryId } from '../../interfaces/football/countries.js';
import { footballRepository } from '../../repositories/football.js';
import { getCachedDataByKey, setCachedData } from '../../repositories/redisRepository.js';
import { filterCountriesById } from '../../utils/utils.js';

type CountriesCache = { countries: Country[] };

export const getCountriesUseCase = async (countryId: CountryId = null): Promise<Country[]> => {
    const cached = await getCachedDataByKey<CountriesCache>(FOOTBALL_COUNTRIES_CACHE_KEY);

    if (cached) {
        return filterCountriesById(cached.countries, countryId);
    }

    const countriesResponse = await footballRepository.getCountries();
    const payload: CountriesCache = { countries: countriesResponse };
    await setCachedData(FOOTBALL_COUNTRIES_CACHE_KEY, payload, FOOTBALL_CACHE_TTL);

    return filterCountriesById(payload.countries, countryId);
};
