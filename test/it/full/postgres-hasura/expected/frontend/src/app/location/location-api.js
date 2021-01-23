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
  numberMatch,
  optionalGet,
  update
} from '../../api'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => a.name.localeCompare(b.name))
}

update(data => ({ ...data, locations: data.locations || [] }))

const expandLocation = values => {
  return values
}

export const locationToApi = values => {
  return values
}
export const locationFromApi = values => {
  return values
}

export const listLocations = params => {
  const result = list(params, pageSize, 'locations',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'name')
  )
    .map(expandLocation)
    .map(locationFromApi)
  console.log('listLocations', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useLocations = (params, $page = 0, options = {}) =>
  useSWR(['/locations',
    qs.stringify(params), $page], () => listLocations({ ...params, $page }), { ...defaultSWROptions, ...options })

const getLocation = id => {
  const result = locationFromApi(expandLocation(getEntity(id, 'locations')))
  console.log('getLocation', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useLocation = (id, options = {}) =>
  useSWR(`/locations/${id}`, optionalGet(id, () => getLocation(id)), { ...defaultSWROptions, ...options })
export const useLocationEdit = (id, options = {}) =>
  useLocation(id, { ...editSWROptions, ...options })

export const createLocation = values => {
  const request = locationToApi(values)
  const result = create({
    ...request
  }, 'locations', sort)
  console.log('createLocation', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateLocation = (id, version, values) => {
  const request = locationToApi(values)
  console.log('updateLocation', id, version, request)
  modify(id, version, 'locations', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchLocation = (id, version, values) => {
  const request = locationToApi(values)
  console.log('patchLocation', id, version, request)
  modify(id, version, 'locations', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
