const fs = require('fs')
const path = require('path')
const { pascalCase } = require('change-case')

const generateLocalStorageJs = (meta, setup) => {
  console.log('- Generating React "local-storage.js"')

  const localStorageKey = 'CaseFuGeneratorAppData' + ((meta.systemName && pascalCase(meta.systemName)) || '')

  const content = `const localStorageKey = '${localStorageKey}'

export const get = () => JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
export const update = fn => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(fn(get())))
}

export const isValidationError = _ => false

export const nextId = data => data.length
  ? data.map(({ id }) => id).sort((a, b) => b - a)[0] + 1
  : 1

export const exactMatch = (params, entity, name) =>
  !params[name] || (entity[name] === params[name])

export const numberMatch = (params, entity, name) =>
  params[name] === null || params[name] === undefined || (entity[name] === Number(params[name]))

export const caseInsensitiveMatch = (params, entity, name) =>
  !params[name] || (entity[name] && entity[name].toLowerCase().indexOf(params[name].toLowerCase()) === 0)

export const atLeast = (params, paramName, entity, attributeName) =>
  !params[paramName] || (entity[attributeName] >= params[paramName])

export const atMost = (params, paramName, entity, attributeName) =>
  !params[paramName] || (entity[attributeName] <= params[paramName])

export const list = (params, pageSize, key, filterFn) => {
  const page = params.$page || 0
  return get()[key]
    .filter(filterFn)
    .slice(page * pageSize, (page + 1) * pageSize)
}

export const getEntity = (id, key) => {
  return get()[key]
    .find(item => item.id === Number(id))
}

export const expand = (values, from, to, key) => {
  const result = { ...values }
  result[to] = getEntity(result[from], key)
  delete result[from]
  return result
}

export const create = (values, key, sort) => {
  let id
  update(data => {
    id = nextId(data[key])
    data[key].push({ ...values, id, version: 0 })
    sort(data[key])
    return data
  })
  return { id }
}

export const modify = (id, version, key, sort, modificationFn) => {
  id = Number(id)
  version = Number(version)
  update(data => {
    const index = data[key].findIndex(item => item.id === id && item.version === version)
    if (index < 0) {
      throw new Error(\`Entity '\${key}' with id \${id} and version \${version} not found.\`)
    }
    version++
    data[key][index] = modificationFn(id, version, data[key][index])
    sort(data[key])
    return data
  })
}
`

  const dir = path.join(setup.outputDir, 'frontend')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'src', 'api', 'local-storage.js'), content)
}

module.exports = {
  generateLocalStorageJs
}
