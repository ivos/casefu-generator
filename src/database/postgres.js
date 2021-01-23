const fs = require('fs')
const path = require('path')
const { snakeCase } = require('change-case')
const pluralize = require('pluralize')
const {
  entityCodes,
  attributeEntries,
  isPrimaryKey,
  isToOne,
  isUnique,
  isNotNull,
  isEnum,
  extractEntityCodeFromRef,
  getPKDataTypeForFK,
  ownAttributeEntries,
  enumValues
} = require('../meta/entity')

const indent = '    '

const getTableName = entityCode => snakeCase(pluralize(entityCode))
const getColumnName = attributeCode => snakeCase(attributeCode)
const getEnumTypeName = (entityCode, attributeCode) => `${getTableName(entityCode)}__${getColumnName(attributeCode)}`

const columnType = (meta, entityCode, attributeEntry) => {
  const [attributeCode, attributeDef] = attributeEntry
  let type = attributeDef.dataType || 'text'
  if (isToOne(attributeEntry)) {
    const referredEntityCode = extractEntityCodeFromRef(type)
    type = getPKDataTypeForFK(meta, referredEntityCode)
  }
  if (isEnum(attributeEntry)) {
    type = `${getEnumTypeName(entityCode, attributeCode)}`
  }
  if (isPrimaryKey(attributeEntry)) {
    return `${type} primary key`
  }
  if (isNotNull(attributeEntry)) {
    return `${type} not null`
  }
  return `${type}`
}

const columnDef = (meta, entityCode) => attributeEntry =>
  `${indent}${getColumnName(attributeEntry[0])} ${columnType(meta, entityCode, attributeEntry)}`

const columnDefs = (meta, entityCode) =>
  ownAttributeEntries(meta, entityCode, 'bigserial')
    .map(columnDef(meta, entityCode))
    .join(',\n')

const fkConstraint = (meta, entityCode) => ([attributeCode, { dataType }]) => {
  const tableName = getTableName(entityCode)
  const columnName = getColumnName(attributeCode)
  const referredEntityCode = extractEntityCodeFromRef(dataType || 'text')
  const referredTableName = getTableName(referredEntityCode)
  return `\nalter table ${tableName}\n${indent}add constraint fk_${tableName}__${columnName}` +
    ` foreign key (${columnName}) references ${referredTableName} on delete cascade;`
}

const fkConstraints = meta => entityCode =>
  attributeEntries(meta, entityCode)
    .filter(isToOne)
    .map(fkConstraint(meta, entityCode))
    .join('')

const uniqueIndex = entityCode => ([attributeCode, _]) => {
  const tableName = getTableName(entityCode)
  const columnName = getColumnName(attributeCode)
  return `\ncreate unique index ui_${tableName}__${columnName} on ${tableName} (${columnName});`
}

const uniqueIndexes = (meta, entityCode) =>
  attributeEntries(meta, entityCode)
    .filter(isUnique)
    .map(uniqueIndex(entityCode))
    .join('')

const enumType = (meta, entityCode) => ([attributeCode, attributeDef]) => {
  const enumTypeName = getEnumTypeName(entityCode, attributeCode)
  const values = enumValues(attributeDef)
    .map(s => `'${s}'`)
    .join(', ')
  return `\ncreate type ${enumTypeName} as enum (${values});`
}

const enumTypes = (meta, entityCode) =>
  attributeEntries(meta, entityCode)
    .filter(isEnum)
    .map(enumType(meta, entityCode))
    .join('')

const createTable = meta => entityCode =>
  `-- Entity: ${meta.sections[entityCode].name}${enumTypes(meta, entityCode)}
create table ${getTableName(entityCode)}
(
${columnDefs(meta, entityCode)}
);` +
  `${uniqueIndexes(meta, entityCode)}`

const generateCreateTables = (meta, targetDir) => {
  console.log('- Generating Postgres "create-tables.sql"')
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
  const dir = path.join(targetDir, 'postgres')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'create-tables.sql'), content)
}

const generateDockerfile = targetDir => {
  console.log('- Generating Postgres "Dockerfile"')
  const content = `FROM postgres
COPY create-tables.sql /docker-entrypoint-initdb.d/
`
  fs.writeFileSync(path.join(targetDir, 'postgres', 'Dockerfile'), content)
}

const generatePostgres = (meta, targetDir) => {
  generateCreateTables(meta, targetDir)
  generateDockerfile(targetDir)
}

module.exports = {
  generatePostgres
}
