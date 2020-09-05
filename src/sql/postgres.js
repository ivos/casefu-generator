const fs = require('fs')
const path = require('path')
const { snakeCase } = require('snake-case')

const indent = '    '
const enumPrefix = 'enum: '

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
const isUnique = status => ['U', 'OU'].includes(status)
const isNotNull = status =>
  ['FK', 'NK', 'BK', 'U', 'M'].includes(status) ||
  ['1', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isMany = status => ['n', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isEnum = type => type.indexOf(enumPrefix) === 0

const getTableName = entityCode => snakeCase(entityCode)
const getColumnName = attributeCode => snakeCase(attributeCode)
const getEnumTypeName = (entityCode, attributeCode) => `${getTableName(entityCode)}__${getColumnName(attributeCode)}`

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

const entityCodes = meta => Object.keys(meta.sections)
  .filter(code => meta.sections[code].type === 'entity')

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
  if (isEnum(type)) {
    type = `${getEnumTypeName(entityCode, attributeCode)}`
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
  `${indent}${getColumnName(attributeCode)} ${columnType(meta, entityCode, attributeCode)}`

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
    .join(',\n')
}

const fkConstraint = (meta, entityCode) => attributeCode => {
  const tableName = getTableName(entityCode)
  const columnName = getColumnName(attributeCode)
  const attDef = attributeDef(meta, entityCode, attributeCode)
  const type = attDef.dataType || 'text'
  const referredEntityCode = extractEntityCodeFromRef(type)
  const referredTableName = getTableName(referredEntityCode)
  return `\nalter table ${tableName}\n${indent}add constraint fk_${tableName}__${columnName}` +
    ` foreign key (${columnName}) references ${referredTableName} on delete cascade;`
}

const fkConstraints = meta => entityCode => attributeCodes(meta, entityCode)
  .filter(attributeCode => isForeignKey(attributeDef(meta, entityCode, attributeCode).status || ''))
  .map(fkConstraint(meta, entityCode))
  .join('')

const uniqueIndex = entityCode => attributeCode => {
  const tableName = getTableName(entityCode)
  const columnName = getColumnName(attributeCode)
  return `\ncreate unique index ui_${tableName}__${columnName} on ${tableName} (${columnName});`
}

const uniqueIndexes = (meta, entityCode) => attributeCodes(meta, entityCode)
  .filter(attributeCode => isUnique(attributeDef(meta, entityCode, attributeCode).status))
  .map(uniqueIndex(entityCode))
  .join('')

const enumType = (meta, entityCode) => attributeCode => {
  const enumTypeName = getEnumTypeName(entityCode, attributeCode)
  const attDef = attributeDef(meta, entityCode, attributeCode)
  const enumValues = attDef.dataType.trim().substring(enumPrefix.length)
    .split(',')
    .map(s => s.trim())
    .map(s => s.replace(/\s+/g, '_'))
    .map(s => `'${s}'`)
    .join(', ')
  return `\ncreate type ${enumTypeName} as enum (${enumValues});`
}

const enumTypes = (meta, entityCode) => attributeCodes(meta, entityCode)
  .filter(attributeCode => isEnum(attributeDef(meta, entityCode, attributeCode).dataType))
  .map(enumType(meta, entityCode))
  .join('')

const createTable = meta => entityCode =>
  `-- Entity: ${meta.sections[entityCode].name}${enumTypes(meta, entityCode)}
create table ${getTableName(entityCode)}
(
${columnDefs(meta, entityCode)}
);` +
  `${uniqueIndexes(meta, entityCode)}`

const generate = (meta, setup) => {
  console.log('Generating Postgres SQL...')
  const tables =
    entityCodes(meta)
      .map(createTable(meta))
      .join('\n\n') +
    '\n'
  const foreignKeys =
    entityCodes(meta)
      .map(fkConstraints(meta))
      .filter(v => v !== '')
      .join('') +
    '\n'
  const content =
    `-- Tables
---------

${tables}

-- Foreign keys
---------------
${foreignKeys}`
  fs.writeFileSync(path.join(setup.outputDir, 'casefu-postgres.sql'), content)
}

module.exports = { generate }
