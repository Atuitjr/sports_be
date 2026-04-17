import type { Country, CountriesRequest } from "../../interfaces/football/countries.ts";
import { getCountriesUseCase } from "../../useCases/football/countries.ts";



export const getCountriesController = async (req: CountriesRequest, res: any) => {
    try {
        
        const headers = req.headers;
        const { countryid } = headers;

        if (!countryid) {
            res.status(400).json({ error: 'Bad Request',  message: 'countryid header is required' });
            return;
        }

        const countriesList: Country[] = await getCountriesUseCase(Number(countryid || "-1"));
        
        res.status(200).json({ countries: countriesList });
    } catch (error) {
        res.status(401).json({ error: 'Server error',  message: error  });
    }
};