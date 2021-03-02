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
  getEntity,
  list,
  modify,
  numberMatch,
  optionalGet,
  update
} from '../../api'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => String(a.personalNumber).localeCompare(String(b.personalNumber)))
}

update(data => ({ ...data, people: data.people || [] }))

export const expandPerson = values => {
  return values
}

export const personToApi = values => {
  return values
}
export const personFromApi = values => {
  return values
}

export const listPeople = params => {
  const result = list(params, pageSize, 'people',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'personalNumber') &&
      caseInsensitiveMatch(params, item, 'familyName') &&
      caseInsensitiveMatch(params, item, 'givenNames') &&
      caseInsensitiveMatch(params, item, 'userName') &&
      caseInsensitiveMatch(params, item, 'email') &&
      exactMatch(params, item, 'sex')
  )
    .map(expandPerson)
    .map(personFromApi)
  console.log('listPeople', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const usePeople = (params, $page = 0, options = {}) =>
  useSWR(['/people',
    qs.stringify(params), $page], () => listPeople({ ...params, $page }), { ...defaultSWROptions, ...options })

const getPerson = id => {
  const result = personFromApi(expandPerson(getEntity(id, 'people')))
  console.log('getPerson', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const usePerson = (id, options = {}) =>
  useSWR(`/people/${id}`, optionalGet(id, () => getPerson(id)), { ...defaultSWROptions, ...options })
export const usePersonEdit = (id, options = {}) =>
  usePerson(id, { ...editSWROptions, ...options })

export const createPerson = values => {
  const request = personToApi(values)
  const result = create({
    ...request
  }, 'people', sort)
  console.log('createPerson', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updatePerson = (id, version, values) => {
  const request = personToApi(values)
  console.log('updatePerson', id, version, request)
  modify(id, version, 'people', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchPerson = (id, version, values) => {
  const request = personToApi(values)
  console.log('patchPerson', id, version, request)
  modify(id, version, 'people', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
