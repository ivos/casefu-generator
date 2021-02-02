import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
  caseInsensitiveMatch,
  create,
  defaultSWROptions,
  delay,
  editSWROptions,
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
  data.sort((a, b) => String(a.code).localeCompare(String(b.code)))
}

update(data => ({ ...data, detailAs: data.detailAs || [] }))

const expandDetailA = values => {
  values = expand(values, 'masterId', 'master', 'masterAs')
  return values
}

export const detailAToApi = values => {
  values = collapse(values, 'master', 'id', 'masterId')
  return values
}
export const detailAFromApi = values => {
  values = restore(values, 'masterId', 'master', 'id')
  return values
}

export const listDetailAs = params => {
  const result = list(params, pageSize, 'detailAs',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'code') &&
      caseInsensitiveMatch(params, item, 'name') &&
      numberMatch(params, item, 'masterId')
  )
    .map(expandDetailA)
    .map(detailAFromApi)
  console.log('listDetailAs', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useDetailAs = (params, $page = 0, options = {}) =>
  useSWR(['/detail-as',
    qs.stringify(params), $page], () => listDetailAs({ ...params, $page }), { ...defaultSWROptions, ...options })

const getDetailA = id => {
  const result = detailAFromApi(expandDetailA(getEntity(id, 'detailAs')))
  console.log('getDetailA', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useDetailA = (id, options = {}) =>
  useSWR(`/detail-as/${id}`, optionalGet(id, () => getDetailA(id)), { ...defaultSWROptions, ...options })
export const useDetailAEdit = (id, options = {}) =>
  useDetailA(id, { ...editSWROptions, ...options })

export const createDetailA = values => {
  const request = detailAToApi(values)
  const result = create({
    ...request
  }, 'detailAs', sort)
  console.log('createDetailA', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateDetailA = (id, version, values) => {
  const request = detailAToApi(values)
  console.log('updateDetailA', id, version, request)
  modify(id, version, 'detailAs', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchDetailA = (id, version, values) => {
  const request = detailAToApi(values)
  console.log('patchDetailA', id, version, request)
  modify(id, version, 'detailAs', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
