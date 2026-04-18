import type { Country, CountryId } from '../interfaces/football/countries.js';

export const flatParams = (params: Record<string, string | number | boolean>): string => {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
};

export const filterCountriesById = (countries: Country[], countryId: CountryId): Country[] => {
    if (countryId === null) return countries;
    return countries.filter(country => country.id === countryId);
};
