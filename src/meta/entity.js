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
const isToMany = status => ['n', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isEnum = type => type.indexOf(enumPrefix) === 0

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

const enumValues = (meta, entityCode, attributeCode) => {
  const attDef = attributeDef(meta, entityCode, attributeCode)
  return attDef.dataType.trim().substring(enumPrefix.length)
    .split(',')
    .map(s => s.trim())
    .map(s => s.replace(/\s+/g, '_'))
}

const getExplicitPKAttDef = (meta, entityCode) => {
  const explicitPKAttDefs = attributeCodes(meta, entityCode)
    .map(attributeCode => attributeDef(meta, entityCode, attributeCode))
    .filter(attDef => isPrimaryKey(attDef.status))
  return explicitPKAttDefs.length > 0 ? explicitPKAttDefs[0] : null
}

module.exports = {
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
}
