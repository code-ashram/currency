import { CURRENCY } from './constants/currency'

type Success = {
  status: 'success'
}

type Failed = {
  status: 'failed'
  error: {
    message: string
    code: string
  }
}

type Status = Success | Failed

export type CurrencyCode = keyof typeof CURRENCY

type BasicConversion = {
  base_currency_code: string,
  base_currency_name: string,
  amount: string,
  updated_date: string
}

type Currency = {
  currency_name: string,
  rate: string
  rate_for_amount: string
}

export type CurrenciesListResponse = Status & {
  currencies: Record<CurrencyCode, string>
}

export type ConversionResponse = Status & BasicConversion & {
  rates: Record<CurrencyCode, Currency>
}

export type DateRangeData = ConversionResponse[]
