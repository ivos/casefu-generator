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
  data.sort((a, b) => String(a.name).localeCompare(String(b.name)))
}

update(data => ({ ...data, detailBs: data.detailBs || [] }))

const expandDetailB = values => {
  values = expand(values, 'masterA1Id', 'masterA1', 'masterAs')
  values = expand(values, 'masterA2Id', 'masterA2', 'masterAs')
  values = expand(values, 'masterB1Id', 'masterB1', 'masterBs')
  values = expand(values, 'masterB2Id', 'masterB2', 'masterBs')
  return values
}

export const detailBToApi = values => {
  values = collapse(values, 'masterA1', 'id', 'masterA1Id')
  values = collapse(values, 'masterA2', 'id', 'masterA2Id')
  values = collapse(values, 'masterB1', 'id', 'masterB1Id')
  values = collapse(values, 'masterB2', 'id', 'masterB2Id')
  return values
}
export const detailBFromApi = values => {
  values = restore(values, 'masterA1Id', 'masterA1', 'id')
  values = restore(values, 'masterA2Id', 'masterA2', 'id')
  values = restore(values, 'masterB1Id', 'masterB1', 'id')
  values = restore(values, 'masterB2Id', 'masterB2', 'id')
  return values
}

export const listDetailBs = params => {
  const result = list(params, pageSize, 'detailBs',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'name') &&
      numberMatch(params, item, 'masterA1Id') &&
      numberMatch(params, item, 'masterA2Id') &&
      numberMatch(params, item, 'masterB1Id') &&
      numberMatch(params, item, 'masterB2Id')
  )
    .map(expandDetailB)
    .map(detailBFromApi)
  console.log('listDetailBs', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useDetailBs = (params, $page = 0, options = {}) =>
  useSWR(['/detail-bs',
    qs.stringify(params), $page], () => listDetailBs({ ...params, $page }), { ...defaultSWROptions, ...options })

const getDetailB = id => {
  const result = detailBFromApi(expandDetailB(getEntity(id, 'detailBs')))
  console.log('getDetailB', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useDetailB = (id, options = {}) =>
  useSWR(`/detail-bs/${id}`, optionalGet(id, () => getDetailB(id)), { ...defaultSWROptions, ...options })
export const useDetailBEdit = (id, options = {}) =>
  useDetailB(id, { ...editSWROptions, ...options })

export const createDetailB = values => {
  const request = detailBToApi(values)
  const result = create({
    ...request
  }, 'detailBs', sort)
  console.log('createDetailB', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateDetailB = (id, version, values) => {
  const request = detailBToApi(values)
  console.log('updateDetailB', id, version, request)
  modify(id, version, 'detailBs', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchDetailB = (id, version, values) => {
  const request = detailBToApi(values)
  console.log('patchDetailB', id, version, request)
  modify(id, version, 'detailBs', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
