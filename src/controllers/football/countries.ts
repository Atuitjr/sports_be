import type { Response } from 'express';
import type { Country, CountriesRequest, CountryId } from '../../interfaces/football/countries.js';
import { getCountriesUseCase } from '../../useCases/football/countries.js';

export const getCountriesController = async (req: CountriesRequest, res: Response): Promise<void> => {
    const { countryId } = req.query;

    let countryid: CountryId = null;
    if (countryId !== undefined) {
        const parsed = parseInt(countryId, 10);
        if (isNaN(parsed)) {
            res.status(400).json({ error: 'countryId must be a valid number' });
            return;
        }
        countryid = parsed;
    }

    const countries: Country[] = await getCountriesUseCase(countryid);
    res.status(200).json({ countries });
};
