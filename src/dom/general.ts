import { CurrencyCode } from '../types'
import { getConvertCurrency } from '../api'

const converterForm = document.getElementById('form') as HTMLFormElement
const fromCurrencySelect = document.getElementById('from') as HTMLSelectElement
const toCurrencySelect = document.getElementById('to') as HTMLSelectElement
const fromLabel = document.getElementById('labelFrom') as HTMLSpanElement
const toLabel = document.getElementById('labelTo') as HTMLSpanElement

export const createOption = (optionText: string, optionValue: string): HTMLOptionElement => {
  const option = document.createElement('option') as HTMLOptionElement

  option.value = optionValue
  option.text = optionText

  return option
}

export const addOptions = (currencies: Record<CurrencyCode, string>): void => {

  const optionsFrom: Array<HTMLOptionElement> = Object.entries(currencies).sort()
    .map((currencyKey) => createOption(currencyKey[1], currencyKey[0]))

  const optionsTo: Array<HTMLOptionElement> = Object.entries(currencies).sort()
    .map((currencyKey) => createOption(currencyKey[1], currencyKey[0]))

  fromCurrencySelect.append(...optionsFrom)
  toCurrencySelect.append(...optionsTo)

  fromLabel.textContent = fromCurrencySelect.value
  toLabel.textContent = toCurrencySelect.value

  fromCurrencySelect.addEventListener('change', (event) => {
    fromLabel.textContent = (event.target as HTMLOptionElement).value
  })

  toCurrencySelect.addEventListener('change', (event) => {
    toLabel.textContent = (event.target as HTMLOptionElement).value
  })
}

converterForm.addEventListener('submit', (): void => {
  const input = document.getElementById('input') as HTMLInputElement
  const output = document.getElementById('output') as HTMLOutputElement

  const from = fromLabel.textContent as CurrencyCode
  const to = toLabel.textContent as CurrencyCode
  const amount = Number(input.value)

  getConvertCurrency(from, to, amount)
    .then((response) => {
      output.textContent = response.rates[to].rate_for_amount
    })
})

