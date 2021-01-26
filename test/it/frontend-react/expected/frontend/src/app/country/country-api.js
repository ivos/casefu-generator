import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
  caseInsensitiveMatch,
  create,
  defaultSWROptions,
  delay,
  editSWROptions,
  getEntity,
  list,
  modify,
  optionalGet,
  update
} from '../../api'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => a.name.localeCompare(b.name))
}

update(data => ({ ...data, countries: data.countries || [] }))

const expandCountry = values => {
  return values
}

export const countryToApi = values => {
  return values
}
export const countryFromApi = values => {
  return values
}

export const listCountries = params => {
  const result = list(params, pageSize, 'countries',
    item =>
      caseInsensitiveMatch(params, item, 'code') &&
      caseInsensitiveMatch(params, item, 'name')
  )
    .map(expandCountry)
    .map(countryFromApi)
  console.log('listCountries', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useCountries = (params, $page = 0, options = {}) =>
  useSWR(['/countries',
    qs.stringify(params), $page], () => listCountries({ ...params, $page }), { ...defaultSWROptions, ...options })

const getCountry = id => {
  const result = countryFromApi(expandCountry(getEntity(id, 'countries')))
  console.log('getCountry', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useCountry = (id, options = {}) =>
  useSWR(`/countries/${id}`, optionalGet(id, () => getCountry(id)), { ...defaultSWROptions, ...options })
export const useCountryEdit = (id, options = {}) =>
  useCountry(id, { ...editSWROptions, ...options })

export const createCountry = values => {
  const request = countryToApi(values)
  const result = create({
    ...request
  }, 'countries', sort)
  console.log('createCountry', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateCountry = (id, version, values) => {
  const request = countryToApi(values)
  console.log('updateCountry', id, version, request)
  modify(id, version, 'countries', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchCountry = (id, version, values) => {
  const request = countryToApi(values)
  console.log('patchCountry', id, version, request)
  modify(id, version, 'countries', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
