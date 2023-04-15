import { CurrencyCode } from '../types'
import { getConvertCurrency } from '../api'
import Chart from 'chart.js/auto'

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

const ctx = document.getElementById('myChart') as HTMLCanvasElement

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']

const datapoints = [0, 20, 20, 60, 60, 120, 160, 180, 120, 125, 105, 110, 170]
const data = {
  labels: labels,
  datasets: [
    {
      label: 'History of the exchange rate for the last 12 months',
      data: datapoints,
      borderColor: 'blue',
      fill: false,
      cubicInterpolationMode: 'monotone',
      tension: 0.4
    }
  ]
}

new Chart(
  ctx,
  {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true
        }
      },
      interaction: {
        intersect: false
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Value'
          },
          suggestedMin: -10,
          suggestedMax: 200
        }
      }
    }
  }
)

