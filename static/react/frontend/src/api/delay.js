import { dataLoadingDelay } from '../constants'

export const delay = value =>
  new Promise(resolve =>
    window.setTimeout(resolve.bind(null, value), dataLoadingDelay()))
