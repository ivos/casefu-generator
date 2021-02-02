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

update(data => ({ ...data, masterBs: data.masterBs || [] }))

const expandMasterB = values => {
  return values
}

export const masterBToApi = values => {
  return values
}
export const masterBFromApi = values => {
  return values
}

export const listMasterBs = params => {
  const result = list(params, pageSize, 'masterBs',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'name')
  )
    .map(expandMasterB)
    .map(masterBFromApi)
  console.log('listMasterBs', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useMasterBs = (params, $page = 0, options = {}) =>
  useSWR(['/master-bs',
    qs.stringify(params), $page], () => listMasterBs({ ...params, $page }), { ...defaultSWROptions, ...options })

const getMasterB = id => {
  const result = masterBFromApi(expandMasterB(getEntity(id, 'masterBs')))
  console.log('getMasterB', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useMasterB = (id, options = {}) =>
  useSWR(`/master-bs/${id}`, optionalGet(id, () => getMasterB(id)), { ...defaultSWROptions, ...options })
export const useMasterBEdit = (id, options = {}) =>
  useMasterB(id, { ...editSWROptions, ...options })

export const createMasterB = values => {
  const request = masterBToApi(values)
  const result = create({
    ...request
  }, 'masterBs', sort)
  console.log('createMasterB', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateMasterB = (id, version, values) => {
  const request = masterBToApi(values)
  console.log('updateMasterB', id, version, request)
  modify(id, version, 'masterBs', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchMasterB = (id, version, values) => {
  const request = masterBToApi(values)
  console.log('patchMasterB', id, version, request)
  modify(id, version, 'masterBs', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
