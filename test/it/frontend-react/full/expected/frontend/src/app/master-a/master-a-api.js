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
  data.sort((a, b) => String(a.code).localeCompare(String(b.code)))
}

update(data => ({ ...data, masterAs: data.masterAs || [] }))

const expandMasterA = values => {
  return values
}

export const masterAToApi = values => {
  return values
}
export const masterAFromApi = values => {
  return values
}

export const listMasterAs = params => {
  const result = list(params, pageSize, 'masterAs',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'code') &&
      caseInsensitiveMatch(params, item, 'name')
  )
    .map(expandMasterA)
    .map(masterAFromApi)
  console.log('listMasterAs', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useMasterAs = (params, $page = 0, options = {}) =>
  useSWR(['/master-as',
    qs.stringify(params), $page], () => listMasterAs({ ...params, $page }), { ...defaultSWROptions, ...options })

const getMasterA = id => {
  const result = masterAFromApi(expandMasterA(getEntity(id, 'masterAs')))
  console.log('getMasterA', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useMasterA = (id, options = {}) =>
  useSWR(`/master-as/${id}`, optionalGet(id, () => getMasterA(id)), { ...defaultSWROptions, ...options })
export const useMasterAEdit = (id, options = {}) =>
  useMasterA(id, { ...editSWROptions, ...options })

export const createMasterA = values => {
  const request = masterAToApi(values)
  const result = create({
    ...request
  }, 'masterAs', sort)
  console.log('createMasterA', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateMasterA = (id, version, values) => {
  const request = masterAToApi(values)
  console.log('updateMasterA', id, version, request)
  modify(id, version, 'masterAs', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchMasterA = (id, version, values) => {
  const request = masterAToApi(values)
  console.log('patchMasterA', id, version, request)
  modify(id, version, 'masterAs', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
