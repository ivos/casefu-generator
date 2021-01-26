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
  data.sort((a, b) => a.street.localeCompare(b.street))
}

update(data => ({ ...data, branches: data.branches || [] }))

const expandBranch = values => {
  return values
}

export const branchToApi = values => {
  return values
}
export const branchFromApi = values => {
  return values
}

export const listBranches = params => {
  const result = list(params, pageSize, 'branches',
    item =>
      numberMatch(params, item, 'id') &&
      caseInsensitiveMatch(params, item, 'street') &&
      caseInsensitiveMatch(params, item, 'city') &&
      caseInsensitiveMatch(params, item, 'zipCode') &&
      exactMatch(params, item, 'type') &&
      caseInsensitiveMatch(params, item, 'note')
  )
    .map(expandBranch)
    .map(branchFromApi)
  console.log('listBranches', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useBranches = (params, $page = 0, options = {}) =>
  useSWR(['/branches',
    qs.stringify(params), $page], () => listBranches({ ...params, $page }), { ...defaultSWROptions, ...options })

const getBranch = id => {
  const result = branchFromApi(expandBranch(getEntity(id, 'branches')))
  console.log('getBranch', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const useBranch = (id, options = {}) =>
  useSWR(`/branches/${id}`, optionalGet(id, () => getBranch(id)), { ...defaultSWROptions, ...options })
export const useBranchEdit = (id, options = {}) =>
  useBranch(id, { ...editSWROptions, ...options })

export const createBranch = values => {
  const request = branchToApi(values)
  const result = create({
    ...request
  }, 'branches', sort)
  console.log('createBranch', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const updateBranch = (id, version, values) => {
  const request = branchToApi(values)
  console.log('updateBranch', id, version, request)
  modify(id, version, 'branches', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patchBranch = (id, version, values) => {
  const request = branchToApi(values)
  console.log('patchBranch', id, version, request)
  modify(id, version, 'branches', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
