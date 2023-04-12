// @ts-ignore
import * as bootstrap from 'bootstrap'
import './style.scss'
import { getCurrencyList } from './api'
import { addOptions} from './dom/general'

getCurrencyList()
  .then((response) => addOptions(response.currencies))
