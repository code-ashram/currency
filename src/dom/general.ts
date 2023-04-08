import { CurrencyCode } from '../types'

const fromCurrencySelect = document.getElementById('from') as HTMLSelectElement
const toCurrencySelect = document.getElementById('to') as HTMLSelectElement

export const createOption = (optionText: string): HTMLOptionElement => {
  const option = document.createElement('option') as HTMLOptionElement

  option.value = `${optionText}`
  option.text = optionText

  return option
}

export const addOptions = (currencies: Record<CurrencyCode, string>):void => {

  const options: Array<HTMLOptionElement> = Object.keys(currencies).map((currencyKey) => createOption(currencyKey))

  const optionsCopy: Array<HTMLOptionElement> = Object.keys(currencies).map((currencyKey) => createOption(currencyKey))

  fromCurrencySelect.append(...options)
  toCurrencySelect.append(...optionsCopy)
}
