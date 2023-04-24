import Chart from 'chart.js/auto'
import { getHistoricalInfo } from '../api'
import { CurrencyCode } from '../types'
import { fromLabel, toLabel} from './selectors'

const parseDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long'
  }
  return new Date(date).toLocaleDateString('en-GB', options)
}

const DAYS_IN_WEEK = 7

const dateRange = new Array(DAYS_IN_WEEK).fill(null)
  .map((_, index) => Intl.DateTimeFormat('en-CA').format(new Date(new Date().setDate(new Date().getDate() - ((DAYS_IN_WEEK - 1) - index)))))

const chartSelector = document.getElementById('myChart') as HTMLCanvasElement

const chart = new Chart(
  chartSelector,
  {
    data: {
      labels: [],
      datasets: [
        {
          label: 'Currency rate for last 7 days',
          data: [],
          borderColor: 'aqua',
          backgroundColor: 'rgba(0,255,255,0.18)',
          fill: true,
          cubicInterpolationMode: 'monotone',
          tension: 0.2,
          hoverBackgroundColor: 'red',
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    },
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      animations: {
        radius: {
          duration: 400,
          easing: 'linear'
        }
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
        axis: 'x'
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
)

const setChartData = (labels: string[], data: string[]): void => {
  // @ts-ignore
  chart.data.labels = labels
  // @ts-ignore
  chart.data.datasets[0].data = data
  chart.update()
}
export const setHistory = () => {
  Promise.all(dateRange.map((date) => getHistoricalInfo(date, (fromLabel.textContent as CurrencyCode), (toLabel.textContent as CurrencyCode), 1)))
    .then((response) => {
      const dates = response.map((element) => parseDate(element.updated_date))
      const values = response.map((element) => element.rates[toLabel.textContent as CurrencyCode].rate_for_amount)
      setChartData(dates, values)
    })

}
