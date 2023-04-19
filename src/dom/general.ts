import { CurrencyCode } from '../types'
import { getConvertCurrency, getHistoricalInfo } from '../api'
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

export const editDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  }
  return new Date(date).toLocaleDateString('en-GB', options)
}

const DAYS_IN_WEEK = 7

const dateRange = new Array(DAYS_IN_WEEK).fill(null)
  .map((_, index) => Intl.DateTimeFormat('en-CA').format(new Date(new Date().setDate(new Date().getDate() - index))))

const dataForChart = await Promise.all(dateRange.map((date) => getHistoricalInfo(date, ('EUR' as CurrencyCode), ('BYN' as CurrencyCode), 1)
  .then((response) => {
    return [
      response.rates['BYN'].rate_for_amount,
      response.updated_date
    ]
  })))

const chart = document.getElementById('myChart') as HTMLCanvasElement

const labels = dataForChart.map((element) => editDate(element[1])).reverse()

const datapoints = dataForChart.map((element) => element[0]).reverse()

const data = {
  labels: labels,

  datasets: [
    {
      label: 'History of the exchange rate for week',
      data: datapoints,
      borderColor: 'aqua',
      backgroundColor: 'rgba(0,255,255,0.18)',
      fill: true,
      cubicInterpolationMode: 'monotone',
      tension: 0.2,
      hoverRadius: 10,
      hoverBackgroundColor: 'red',
    }
  ]
}

new Chart(
  chart,
  {
    type: 'line',
    data: data,
    options: {
      animations: {
        radius: {
          duration: 400,
          easing: 'linear',
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
      }
    }
  }
)
