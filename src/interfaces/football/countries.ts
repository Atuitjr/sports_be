export  interface Country {
    id: number;
    name: string;
    code: string;
    flag: string;
    parentAreaId: number;
    parentArea: string;
    childAreas?: Country[];
}

export type CountryId  = number | null;

export interface CountriesRequest extends Request {
    headers: Request["headers"] & { countryid: CountryId };
}