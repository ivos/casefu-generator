import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {
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
import { expandMasterA } from '../master-a/master-a-api'
import { expandMasterB } from '../master-b/master-b-api'

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => String(a.masterFirst?.code).localeCompare(String(b.masterFirst?.code)))
}

update(data => ({ ...data, linkAbs: data.linkAbs || [] }))

export const expandLinkAB = values => {
  if (values) {
    values = expand(values, 'masterFirstId', 'masterFirst', 'masterAs')
    values.masterFirst = expandMasterA(values.masterFirst)
    values = expand(values, 'masterSecondId', 'masterSecond', 'masterBs')
    values.masterSecond = expandMasterB(values.masterSecond)
  }
  return values
}

export const linkAbToApi = values => {
  values = collapse(values, 'masterFirst', 'id', 'masterFirstId')
  values = collapse(values, 'masterSecond', 'id', 'masterSecondId')
  return values
}
export const linkAbFromApi = values => {
  values = restore(values, 'masterFirstId', 'masterFirst', 'id')
  values = restore(values, 'masterSecondId', 'masterSecond', 'id')
  return values
}

export const listLinkAbs = params => {
  const result = list(params, pageSize, 'linkAbs',
    item =>
      numberMatch(params, item, 'id') &&
      numberMatch(params, item, 'masterFirstId') &&
      numberMatch(params, item, 'masterSecondId')
  )
    .map(expandLinkAB)
    .map(linkAbFromApi)
  console.log('listLinkAbs', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useLinkAbs = (params, $page = 0, options = {}) =>
  useSWR(['/link-abs',
    qs.stringify(params), $page], () => listLinkAbs({ ...params, $page }), { ...defaultSWROptions, ...options })

const getLinkAB = id => {
  const result = linkAbFromApi(expandLinkAB(getEntity(id, 'linkAbs')))
  console.log('getLinkAB', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useLinkAB = (id, options = {}) =>
  useSWR(`/link-abs/${id}`, optionalGet(id, () => getLinkAB(id)), { ...defaultSWROptions, ...options })
export const useLinkABEdit = (id, options = {}) =>
  useLinkAB(id, { ...editSWROptions, ...options })

export const createLinkAB = values => {
  const request = linkAbToApi(values)
  const result = create({
    ...request
  }, 'linkAbs', sort)
  console.log('createLinkAB', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateLinkAB = (id, version, values) => {
  const request = linkAbToApi(values)
  console.log('updateLinkAB', id, version, request)
  modify(id, version, 'linkAbs', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchLinkAB = (id, version, values) => {
  const request = linkAbToApi(values)
  console.log('patchLinkAB', id, version, request)
  modify(id, version, 'linkAbs', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
