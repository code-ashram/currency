import { CurrencyCode } from '../types'

const fromCurrencySelect = document.getElementById('from') as HTMLSelectElement
const toCurrencySelect = document.getElementById('to') as HTMLSelectElement

const createOption = (optionText: string): HTMLOptionElement => {
  const option = document.createElement('option') as HTMLOptionElement

  option.value = `${optionText}`
  option.text = `${optionText}`

  return option
}

export const addOptions = (currencies: Record<CurrencyCode, string>) => {

  Object.keys(currencies).forEach((currencyKey) => {

    fromCurrencySelect.add(createOption(currencyKey))
    toCurrencySelect.add(createOption(currencyKey))
  })
}


// fromCurrencySelect.addEventListener('change', ()=> {
//   const currencyName = document.querySelectorAll('.form__currency-name')
// })
