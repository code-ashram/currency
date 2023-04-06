import { ConversionResponse, CurrenciesListResponse } from './types'

const API_KEY: string = '19c85f5d7386a131abee07ee2a5ace5ba894c4db'
const BASE_URL: string = 'https://api.getgeoapi.com/v2/currency'

export const getCurrencyList = (): Promise<CurrenciesListResponse> => fetch(`${BASE_URL}/list?api_key=${API_KEY}&format=json`)
  .then(response => response.json())

export const getConvertCurrency = (fromCurrency: string, toCurrency: string, amount: string): Promise<ConversionResponse> => fetch(`${BASE_URL}/convert?api_key=${API_KEY}
&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&format=json`)
  .then(response => response.json())
