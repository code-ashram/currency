import { Conversion, Currencies } from './types'

const API_KEY: string = '19c85f5d7386a131abee07ee2a5ace5ba894c4db'
const url: string = 'https://api.getgeoapi.com/v2/currency'

export const getCurrencyList = (): Promise<Currencies> => fetch(`${url}/list?api_key=${API_KEY}&format=json`)
  .then(response => response.json())

export const convertCurrency = (fromCurrency: string, toCurrency: string, amount: string): Promise<Conversion> => fetch(`${url}/convert?api_key=${API_KEY}
&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&format=json`)
  .then(response => response.json())
