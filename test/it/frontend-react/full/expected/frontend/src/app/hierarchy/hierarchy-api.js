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
  data.sort((a, b) => String(a.parent).localeCompare(String(b.parent)))
}

update(data => ({ ...data, hierarchies: data.hierarchies || [] }))

export const expandHierarchy = values => {
  if (values) {
    values = expand(values, 'parentId', 'parent', 'hierarchies')
    values.parent = expandHierarchy(values.parent)
  }
  return values
}

export const hierarchyToApi = values => {
  values = collapse(values, 'parent', 'id', 'parentId')
  return values
}
export const hierarchyFromApi = values => {
  values = restore(values, 'parentId', 'parent', 'id')
  return values
}

export const listHierarchies = params => {
  const result = list(params, pageSize, 'hierarchies',
    item =>
      numberMatch(params, item, 'id') &&
      numberMatch(params, item, 'parentId') &&
      caseInsensitiveMatch(params, item, 'name')
  )
    .map(expandHierarchy)
    .map(hierarchyFromApi)
  console.log('listHierarchies', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useHierarchies = (params, $page = 0, options = {}) =>
  useSWR(['/hierarchies',
    qs.stringify(params), $page], () => listHierarchies({ ...params, $page }), { ...defaultSWROptions, ...options })

const getHierarchy = id => {
  const result = hierarchyFromApi(expandHierarchy(getEntity(id, 'hierarchies')))
  console.log('getHierarchy', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useHierarchy = (id, options = {}) =>
  useSWR(`/hierarchies/${id}`, optionalGet(id, () => getHierarchy(id)), { ...defaultSWROptions, ...options })
export const useHierarchyEdit = (id, options = {}) =>
  useHierarchy(id, { ...editSWROptions, ...options })

export const createHierarchy = values => {
  const request = hierarchyToApi(values)
  const result = create({
    ...request
  }, 'hierarchies', sort)
  console.log('createHierarchy', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateHierarchy = (id, version, values) => {
  const request = hierarchyToApi(values)
  console.log('updateHierarchy', id, version, request)
  modify(id, version, 'hierarchies', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchHierarchy = (id, version, values) => {
  const request = hierarchyToApi(values)
  console.log('patchHierarchy', id, version, request)
  modify(id, version, 'hierarchies', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
