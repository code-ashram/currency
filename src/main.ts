// @ts-ignore
import * as bootstrap from 'bootstrap'
import './style.scss'
import { convertCurrency, getCurrencyList } from './api'

getCurrencyList().then(list => console.log(list))
convertCurrency('RUB', 'USD', '10').then(result => console.log(result))
