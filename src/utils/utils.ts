import type { Country, CountryId } from "../interfaces/football/countries.ts";

export const flatParams = (params: Record<string, any>): string => {
    return Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

export const filterCountriesById = (countries: Country[], countryId: CountryId = -1): Country[] => {
    if (countryId === -1) return countries;
    return countries.filter(country => country.id === countryId);
    
}