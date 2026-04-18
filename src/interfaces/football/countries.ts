import type { Request } from 'express';

export interface Country {
    id: number;
    name: string;
    code: string;
    flag: string;
    parentAreaId: number;
    parentArea: string;
    childAreas?: Country[];
}

export type CountryId = number | null;

export interface CountriesRequest extends Request {
    query: Request['query'] & { countryId?: string };
}
