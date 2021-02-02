import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
  atLeast,
  atMost,
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
import { collapse, dateTimeToApi, restore, temporalFromApi } from '../../shared/utils'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => String(a.time).localeCompare(String(b.time)))
}

update(data => ({ ...data, events: data.events || [] }))

const expandEvent = values => {
  values = expand(values, 'locationId', 'location', 'locations')
  return values
}

export const eventToApi = values => {
  values = dateTimeToApi('time', values)
  values = dateTimeToApi('timeFrom', values)
  values = dateTimeToApi('timeTo', values)
  values = collapse(values, 'location', 'id', 'locationId')
  return values
}
export const eventFromApi = values => {
  values = temporalFromApi('time', values)
  values = temporalFromApi('timeFrom', values)
  values = temporalFromApi('timeTo', values)
  values = restore(values, 'locationId', 'location', 'id')
  return values
}

export const listEvents = params => {
  const result = list(params, pageSize, 'events',
    item =>
      numberMatch(params, item, 'id') &&
      atLeast(params, 'timeFrom', item, 'time') &&
      atMost(params, 'timeTo', item, 'time') &&
      exactMatch(params, item, 'status') &&
      numberMatch(params, item, 'locationId')
  )
    .map(expandEvent)
    .map(eventFromApi)
  console.log('listEvents', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useEvents = (params, $page = 0, options = {}) =>
  useSWR(['/events',
    qs.stringify(params), $page], () => listEvents({ ...params, $page }), { ...defaultSWROptions, ...options })

const getEvent = id => {
  const result = eventFromApi(expandEvent(getEntity(id, 'events')))
  console.log('getEvent', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useEvent = (id, options = {}) =>
  useSWR(`/events/${id}`, optionalGet(id, () => getEvent(id)), { ...defaultSWROptions, ...options })
export const useEventEdit = (id, options = {}) =>
  useEvent(id, { ...editSWROptions, ...options })

export const createEvent = values => {
  const request = eventToApi(values)
  const result = create({
    ...request
  }, 'events', sort)
  console.log('createEvent', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateEvent = (id, version, values) => {
  const request = eventToApi(values)
  console.log('updateEvent', id, version, request)
  modify(id, version, 'events', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchEvent = (id, version, values) => {
  const request = eventToApi(values)
  console.log('patchEvent', id, version, request)
  modify(id, version, 'events', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
