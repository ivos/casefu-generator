const fs = require('fs')
const path = require('path')
const { snakeCase } = require('change-case')
const pluralize = require('pluralize')
const {
  entityCodes,
  attributeCodes,
  attributeDef,
  hasPrimaryKey,
  isPrimaryKey,
  isForeignKey,
  isUnique,
  isNotNull,
  isToMany,
  isEnum,
  extractEntityCodeFromRef,
  enumValues,
  getExplicitPKAttDef
} = require('../meta/entity')

const indent = '    '

const getTableName = entityCode => snakeCase(pluralize(entityCode))
const getColumnName = attributeCode => snakeCase(attributeCode)
const getEnumTypeName = (entityCode, attributeCode) => `${getTableName(entityCode)}__${getColumnName(attributeCode)}`

const pkToFkConversions = {
  serial: 'integer',
  bigserial: 'bigint'
}

const getPKDataTypeForFK = (meta, entityCode) => {
  const explicitPKAttDef = getExplicitPKAttDef(meta, entityCode)
  if (explicitPKAttDef) {
    const explicitPkType = explicitPKAttDef.dataType
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
    .filter(attributeCode => !isToMany(attributeDef(meta, entityCode, attributeCode).status || ''))
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
  const values = enumValues(meta, entityCode, attributeCode)
    .map(s => `'${s}'`)
    .join(', ')
  return `\ncreate type ${enumTypeName} as enum (${values});`
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

const generateCreateTables = (meta, setup) => {
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
  const dir = path.join(setup.outputDir, 'postgres')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'create-tables.sql'), content)
}

const generateDockerfile = setup => {
  console.log('- Generating Postgres "Dockerfile"')
  const content = `FROM postgres
COPY create-tables.sql /docker-entrypoint-initdb.d/
`
  fs.writeFileSync(path.join(setup.outputDir, 'postgres', 'Dockerfile'), content)
}

const generatePostgres = (meta, setup) => {
  generateCreateTables(meta, setup)
  generateDockerfile(setup)
}

module.exports = {
  generatePostgres
}
