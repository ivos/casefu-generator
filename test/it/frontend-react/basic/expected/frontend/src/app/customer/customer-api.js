import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
  caseInsensitiveMatch,
  create,
  defaultSWROptions,
  delay,
  editSWROptions,
  exactMatch,
  expand,
  getEntity,
  list,
  modify,
  numberMatch,
  optionalGet,
  update
} from '../../api'
import { collapse, restore } from '../../shared/utils'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => String(a.name).localeCompare(String(b.name)))
}

update(data => ({ ...data, customers: data.customers || [] }))

const expandCustomer = values => {
  values = expand(values, 'countryCode', 'country', 'countries')
  return values
}

export const customerToApi = values => {
  values = collapse(values, 'country', 'code', 'countryCode')
  return values
}
export const customerFromApi = values => {
  values = restore(values, 'countryCode', 'country', 'code')
  return values
}

export const listCustomers = params => {
  const result = list(params, pageSize, 'customers',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'name') &&
      caseInsensitiveMatch(params, item, 'countryCode') &&
      exactMatch(params, item, 'status')
  )
    .map(expandCustomer)
    .map(customerFromApi)
  console.log('listCustomers', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useCustomers = (params, $page = 0, options = {}) =>
  useSWR(['/customers',
    qs.stringify(params), $page], () => listCustomers({ ...params, $page }), { ...defaultSWROptions, ...options })

const getCustomer = id => {
  const result = customerFromApi(expandCustomer(getEntity(id, 'customers')))
  console.log('getCustomer', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useCustomer = (id, options = {}) =>
  useSWR(`/customers/${id}`, optionalGet(id, () => getCustomer(id)), { ...defaultSWROptions, ...options })
export const useCustomerEdit = (id, options = {}) =>
  useCustomer(id, { ...editSWROptions, ...options })

export const createCustomer = values => {
  const request = customerToApi(values)
  const result = create({
    ...request,
    status: 'active'
  }, 'customers', sort)
  console.log('createCustomer', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateCustomer = (id, version, values) => {
  const request = customerToApi(values)
  console.log('updateCustomer', id, version, request)
  modify(id, version, 'customers', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchCustomer = (id, version, values) => {
  const request = customerToApi(values)
  console.log('patchCustomer', id, version, request)
  modify(id, version, 'customers', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
