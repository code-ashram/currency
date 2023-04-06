// @ts-ignore
import * as bootstrap from 'bootstrap'
import './style.scss'
import { getConvertCurrency, getCurrencyList } from './api'
import { addOptions } from './dom/general'

getCurrencyList()
  .then((response) => console.log(response))
getConvertCurrency('USD', 'BYN', '100')
  .then((response) => console.log(response))


getCurrencyList()
  .then((response) => addOptions(response.currencies))
