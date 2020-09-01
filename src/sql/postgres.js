const fs = require('fs')
const path = require('path')
const { snakeCase } = require('snake-case')

const indent = '    '

const normalizeRelationStatus = status =>
  status
    .toLowerCase()
    .replace(/[m*]/g, 'n')
    .replace(/0..n/g, 'n')
    .replace(/1..1/g, '1')
const isPrimaryKey = status => ['APK', 'NPK', 'FPK', 'PK'].includes(status)
const isForeignKey = status =>
  ['FPK', 'FK', 'OFK'].includes(status) ||
  ['1', '0..1'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isNotNull = status =>
  ['FK', 'NK', 'BK', 'U', 'M'].includes(status) ||
  ['1', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isMany = status => ['n', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])

const pkToFkConversions = {
  serial: 'integer',
  bigserial: 'bigint'
}

const stripWrappers = (wrapper, text) => {
  let matches = text.match(wrapper)
  while (matches) {
    text = matches[1].trim()
    matches = text.match(wrapper)
  }
  return text
}

const extractEntityCodeFromRef = ref => {
  let entityCode = stripWrappers(/`#([^`]*)`/, ref)
  entityCode = stripWrappers(/\[[^\]]*]\(#([^)]*)\)/, entityCode)
  return entityCode
}

const attributeCodes = (meta, entityCode) => Object.keys(meta.entityAttributes[entityCode] || {})

const attributeDef = (meta, entityCode, attributeCode) => meta.entityAttributes[entityCode][attributeCode]

const hasPrimaryKey = (meta, entityCode) =>
  attributeCodes(meta, entityCode)
    .map(attributeCode => attributeDef(meta, entityCode, attributeCode).status)
    .filter(isPrimaryKey)
    .length > 0

const getPKDataTypeForFK = (meta, entityCode) => {
  const explicitPKAttDefs = attributeCodes(meta, entityCode)
    .map(attributeCode => ({ attributeCode, attDef: attributeDef(meta, entityCode, attributeCode) }))
    .filter(({ attDef }) => isPrimaryKey(attDef.status))
  if (explicitPKAttDefs.length > 0) {
    const explicitPkType = explicitPKAttDefs[0].attDef.dataType
    const referredEntityCode = extractEntityCodeFromRef(explicitPkType)
    if (referredEntityCode !== explicitPkType) {
      return getPKDataTypeForFK(meta, referredEntityCode)
    }
    const converted = pkToFkConversions[explicitPkType.toLowerCase()]
    return converted || explicitPkType
  }
  return 'bigint'
}

const columnType = (meta, entityCode, attributeCode) => {
  const attDef = attributeDef(meta, entityCode, attributeCode)
  const status = attDef.status || 'O'
  let type = attDef.dataType || 'text'
  if (isForeignKey(status)) {
    const referredEntityCode = extractEntityCodeFromRef(type)
    type = getPKDataTypeForFK(meta, referredEntityCode)
  }
  if (isPrimaryKey(status)) {
    return `${type} primary key`
  }
  if (isNotNull(status)) {
    return `${type} not null`
  }
  return `${type}`
}

const columnDef = (meta, entityCode) => attributeCode =>
  `${indent}${snakeCase(attributeCode)} ${columnType(meta, entityCode, attributeCode)}`

const columnDefs = (meta, entityCode) => {
  const explicit = attributeCodes(meta, entityCode)
    .filter(attributeCode => !isMany(attributeDef(meta, entityCode, attributeCode).status || ''))
    .map(columnDef(meta, entityCode))
  const before = []
  const after = []
  if (!hasPrimaryKey(meta, entityCode)) {
    before.push(`${indent}id bigserial primary key`)
  }
  return before.concat(explicit, after)
}

const entityCodes = meta => Object.keys(meta.sections)
  .filter(code => meta.sections[code].type === 'entity')

const createTable = meta => entityCode =>
  `-- Entity: ${meta.sections[entityCode].name}
create table ${snakeCase(entityCode)}
(
${columnDefs(meta, entityCode)
    .join(',\n')}
);`

const generate = (meta, setup) => {
  console.log('Generating Postgres SQL...')
  const content =
    entityCodes(meta)
      .map(createTable(meta))
      .join('\n\n') +
    '\n'
  fs.writeFileSync(path.join(setup.outputDir, 'casefu-postgres.sql'), content)
}

module.exports = { generate }
