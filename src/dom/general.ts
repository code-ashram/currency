import { CurrencyCode } from '../types'

const fromCurrencySelect = document.getElementById('from') as HTMLSelectElement
const toCurrencySelect = document.getElementById('to') as HTMLSelectElement
const labelFrom = document.getElementById('labelFrom') as HTMLSpanElement
const labelTo = document.getElementById('labelTo') as HTMLSpanElement

export const createOption = (optionText: string, optionValue: string): HTMLOptionElement => {
  const option = document.createElement('option') as HTMLOptionElement

  option.value = optionValue
  option.text = optionText

  return option
}

export const addOptions = (currencies: Record<CurrencyCode, string>):void => {

  const optionsFrom: Array<HTMLOptionElement> = Object.entries(currencies).sort()
    .map((currencyKey) => createOption(currencyKey[1], currencyKey[0]))

  const optionsTo: Array<HTMLOptionElement> = Object.entries(currencies).sort()
    .map((currencyKey) => createOption(currencyKey[1], currencyKey[0]))

  fromCurrencySelect.append(...optionsFrom)
  toCurrencySelect.append(...optionsTo)

  labelFrom.textContent = fromCurrencySelect.value
  labelTo.textContent = toCurrencySelect.value

  fromCurrencySelect.addEventListener('change', (event) => {
    labelFrom.textContent = (event.target as HTMLOptionElement).value
  })

  toCurrencySelect.addEventListener('change', (event) => {
    labelTo.textContent = (event.target as HTMLOptionElement).value
  })
}
