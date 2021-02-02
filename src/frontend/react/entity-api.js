const fs = require('fs')
const path = require('path')
const {
  isToOne,
  isEnum,
  isTemporal,
  isNumber,
  extractEntityCodeFromRef,
  getPKDataTypeForFK,
  ownAttributeEntries,
  referredLabelAttribute,
  enumValues,
  filterToOne,
  filterStatusEnum,
  filterDate,
  filterDateTime,
  filterTemporal,
  hasToOne,
  hasEnum,
  hasDate,
  hasDateTime,
  hasTemporal,
  hasNumber,
  primaryKey
} = require('../../meta/entity')
const { pkg, url, codeLower, codeUpper, codePlural, codePluralLower } = require('./shared')

const getSortExpression = (meta, entityCode) => {
  const [attributeCode, { dataType }] = referredLabelAttribute(meta, entityCode)
  const referredEntityCode = extractEntityCodeFromRef(dataType)
  if (referredEntityCode !== dataType) {
    return attributeCode + '?.' + getSortExpression(meta, referredEntityCode)
  }
  return attributeCode
}

const generateApi = (meta, targetDir, entityCode) => {
  const sortExpression = getSortExpression(meta, entityCode)

  let imports = `import useSWR from 'swr'
import qs from 'qs'
import { defaultPageSize } from '../../constants'
import {`
  if (hasTemporal(meta, entityCode)) {
    imports += `
  atLeast,
  atMost,`
  }
  const hasUnspecificOwnAtts =
    ownAttributeEntries(meta, entityCode, 'bigint')
      .filter(attributeEntry =>
        !isToOne(attributeEntry) && !isEnum(attributeEntry) && !isNumber(attributeEntry) && !isTemporal(attributeEntry))
      .length > 0
  if (hasUnspecificOwnAtts) {
    imports += `
  caseInsensitiveMatch,`
  }
  imports += `
  create,
  defaultSWROptions,
  delay,
  editSWROptions,`
  if (hasEnum(meta, entityCode)) {
    imports += `
  exactMatch,`
  }
  if (hasToOne(meta, entityCode)) {
    imports += `
  expand,`
  }
  imports += `
  getEntity,
  list,
  modify,`
  if (hasNumber(meta, entityCode)) {
    imports += `
  numberMatch,`
  }
  imports += `
  optionalGet,
  update
} from '../../api'`
  if (hasToOne(meta, entityCode) || hasTemporal(meta, entityCode)) {
    imports += `
import {`
    if (hasToOne(meta, entityCode)) {
      imports += ' collapse,'
    }
    if (hasDateTime(meta, entityCode)) {
      imports += ' dateTimeToApi,'
    }
    if (hasDate(meta, entityCode)) {
      imports += ' dateToApi,'
    }
    if (hasToOne(meta, entityCode)) {
      imports += ' restore'
    }
    if (hasToOne(meta, entityCode) && hasTemporal(meta, entityCode)) {
      imports += ','
    }
    if (hasTemporal(meta, entityCode)) {
      imports += ' temporalFromApi'
    }
    imports += ' } from \'../../shared/utils\''
  }

  const expandAttribute = ({ from, to, key }) => `
  values = expand(values, '${from}', '${to}', '${key}')`
  let expand = `const expand${entityCode} = values => {`
  expand += filterToOne(meta, entityCode)
    .map(([attributeCode, { dataType }]) => {
      const referredEntityCode = extractEntityCodeFromRef(dataType)
      return {
        from: attributeCode + codeUpper(primaryKey(meta, referredEntityCode)[0]),
        to: attributeCode,
        key: codePluralLower(referredEntityCode)
      }
    })
    .map(expandAttribute)
    .join('')
  expand += `
  return values
}`

  let toApiValues = ''
  const temporalToApi = ({ fn, attributeCode }) => `
  values = ${fn}('${attributeCode}', values)
  values = ${fn}('${attributeCode}From', values)
  values = ${fn}('${attributeCode}To', values)`
  toApiValues +=
    filterDateTime(meta, entityCode)
      .map(([attributeCode]) => ({
        fn: 'dateTimeToApi',
        attributeCode
      }))
      .map(temporalToApi)
      .join('')
  toApiValues +=
    filterDate(meta, entityCode)
      .map(([attributeCode]) => ({
        fn: 'dateToApi',
        attributeCode
      }))
      .map(temporalToApi)
      .join('')
  const collapse = ({ from, id, to }) => `
  values = collapse(values, '${from}', '${id}', '${to}')`
  toApiValues +=
    filterToOne(meta, entityCode)
      .map(([attributeCode, { dataType }]) => {
        const referredEntityCode = extractEntityCodeFromRef(dataType)
        const id = primaryKey(meta, referredEntityCode)[0]
        return {
          from: attributeCode,
          id,
          to: codeLower(`${attributeCode} ${id}`)
        }
      })
      .map(collapse)
      .join('')

  let fromApiValues = ''
  const temporalFromApi = ({ attributeCode }) => `
  values = temporalFromApi('${attributeCode}', values)
  values = temporalFromApi('${attributeCode}From', values)
  values = temporalFromApi('${attributeCode}To', values)`
  fromApiValues +=
    filterTemporal(meta, entityCode)
      .map(([attributeCode]) => ({ attributeCode }))
      .map(temporalFromApi)
      .join('')
  const restore = ({ from, to, id }) => `
  values = restore(values, '${from}', '${to}', '${id}')`
  fromApiValues +=
    filterToOne(meta, entityCode)
      .map(([attributeCode, { dataType }]) => {
        const referredEntityCode = extractEntityCodeFromRef(dataType)
        const id = primaryKey(meta, referredEntityCode)[0]
        return {
          from: codeLower(`${attributeCode} ${id}`),
          to: attributeCode,
          id
        }
      })
      .map(restore)
      .join('')

  const searchItemsSeparator = ' &&\n      '
  const searchItem = attributeEntry => {
    const [attributeCode, { dataType }] = attributeEntry
    if (isToOne(attributeEntry)) {
      const referredEntityCode = extractEntityCodeFromRef(dataType)
      const [referredPKAttributeCode] = primaryKey(meta, referredEntityCode)
      const fkAttributeCode = attributeCode + codeUpper(referredPKAttributeCode)
      const type = getPKDataTypeForFK(meta, referredEntityCode)
      return searchItem([fkAttributeCode, { dataType: type }])
    }
    if (isEnum(attributeEntry)) {
      return `exactMatch(params, item, '${attributeCode}')`
    }
    if (isNumber(attributeEntry)) {
      return `numberMatch(params, item, '${attributeCode}')`
    }
    if (isTemporal(attributeEntry)) {
      return `atLeast(params, '${attributeCode}From', item, '${attributeCode}')` +
        searchItemsSeparator +
        `atMost(params, '${attributeCode}To', item, '${attributeCode}')`
    }
    return `caseInsensitiveMatch(params, item, '${attributeCode}')`
  }
  const searchItems =
    ownAttributeEntries(meta, entityCode, 'bigint')
      .map(searchItem)

  const createFields =
    filterStatusEnum(meta, entityCode)
      .map(([attributeCode, { dataType }]) => `${attributeCode}: '${enumValues({ dataType })[0]}'`)

  const content = `${imports}

const pageSize = defaultPageSize
const sort = data => {
  data.sort((a, b) => String(a.${sortExpression}).localeCompare(String(b.${sortExpression})))
}

update(data => ({ ...data, ${codePluralLower(entityCode)}: data.${codePluralLower(entityCode)} || [] }))

${expand}

export const ${codeLower(entityCode)}ToApi = values => {${toApiValues}
  return values
}
export const ${codeLower(entityCode)}FromApi = values => {${fromApiValues}
  return values
}

export const list${codePlural(entityCode)} = params => {
  const result = list(params, pageSize, '${codePluralLower(entityCode)}',
    item =>
      ${searchItems.length > 0 ? searchItems.join(searchItemsSeparator) : 'true'}
  )
    .map(expand${entityCode})
    .map(${codeLower(entityCode)}FromApi)
  console.log('list${codePlural(entityCode)}', params, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const use${codePlural(entityCode)} = (params, $page = 0, options = {}) =>
  useSWR(['/${url(entityCode)}',
    qs.stringify(params), $page], () => list${codePlural(entityCode)}({ ...params, $page }), { ...defaultSWROptions, ...options })

const get${entityCode} = id => {
  const result = ${codeLower(entityCode)}FromApi(expand${entityCode}(getEntity(id, '${codePluralLower(entityCode)}')))
  console.log('get${entityCode}', id, '=>', result)
  return Promise.resolve(result).then(delay)
}
export const use${entityCode} = (id, options = {}) =>
  useSWR(\`/${url(entityCode)}/\${id}\`, optionalGet(id, () => get${entityCode}(id)), { ...defaultSWROptions, ...options })
export const use${entityCode}Edit = (id, options = {}) =>
  use${entityCode}(id, { ...editSWROptions, ...options })

export const create${entityCode} = values => {
  const request = ${codeLower(entityCode)}ToApi(values)
  const result = create({
    ${['...request', ...createFields].join(',\n    ')}
  }, '${codePluralLower(entityCode)}', sort)
  console.log('create${entityCode}', request, '=>', result)
  return Promise.resolve(result).then(delay)
}

export const update${entityCode} = (id, version, values) => {
  const request = ${codeLower(entityCode)}ToApi(values)
  console.log('update${entityCode}', id, version, request)
  modify(id, version, '${codePluralLower(entityCode)}', sort,
    (id, version) => ({ ...request, id, version }))
  return Promise.resolve().then(delay)
}

export const patch${entityCode} = (id, version, values) => {
  const request = ${codeLower(entityCode)}ToApi(values)
  console.log('patch${entityCode}', id, version, request)
  modify(id, version, '${codePluralLower(entityCode)}', sort,
    (id, version, oldValues) => ({ ...oldValues, ...request, id, version }))
  return Promise.resolve().then(delay)
}
`

  const dir = path.join(targetDir, 'frontend', 'src', 'app', pkg(entityCode))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${pkg(entityCode)}-api.js`), content)
}

module.exports = {
  generateApi
}
