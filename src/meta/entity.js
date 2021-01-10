const enumPrefix = 'enum: '

const normalizeRelationStatus = status =>
  (status || '')
    .toLowerCase()
    .replace(/[m*]/g, 'n')
    .replace(/0..n/g, 'n')
    .replace(/1..1/g, '1')
const isPrimaryKey = ([_, { status }]) => ['APK', 'NPK', 'FPK', 'PK'].includes(status)
const isToOne = ([_, { status }]) =>
  ['FPK', 'FK', 'OFK'].includes(status) ||
  ['1', '0..1'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isUnique = ([_, { status }]) => ['U', 'OU'].includes(status)
const isNotNull = ([_, { status }]) =>
  ['FK', 'NK', 'BK', 'U', 'M', 'V', 'S'].includes(status) ||
  ['1', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isToMany = ([_, { status }]) => ['n', '1..n'].includes(normalizeRelationStatus(status).split(' : ')[1])
const isOwnAttribute = attributeEntry => !isToMany(attributeEntry)
const isEnum = ([_, { dataType }]) => dataType && dataType.indexOf(enumPrefix) === 0
const isStatus = ([_, { status }]) => status === 'S'
const isDate = ([_, { dataType }]) => dataType && ['date'].includes(dataType.toLowerCase())
const isDateTime = ([_, { dataType }]) => dataType && ['timestamp', 'datetime'].includes(dataType.toLowerCase())

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

const attributeEntries = (meta, entityCode) => Object.entries(meta.entityAttributes[entityCode] || {})

const explicitPKAttEntry = (meta, entityCode) => {
  const attDefs = attributeEntries(meta, entityCode)
    .filter(isPrimaryKey)
  return attDefs.length > 0 ? attDefs[0] : null
}

const ownAttributeEntries = (meta, entityCode, defaultPKDataType) => {
  const explicit = attributeEntries(meta, entityCode)
    .filter(isOwnAttribute)
  const hasPrimaryKey = explicit.filter(isPrimaryKey).length > 0
  const before = []
  if (!hasPrimaryKey) {
    before.push(['id', { status: 'APK', dataType: defaultPKDataType }])
  }
  return before.concat(explicit)
}

const userAttributes = (meta, entityCode) =>
  ownAttributeEntries(meta, entityCode)
    .filter(attributeEntry => !isPrimaryKey(attributeEntry))

const referredLabelAttribute = (meta, entityCode) => {
  const userAttrs = userAttributes(meta, entityCode)
  return userAttrs.length > 0 ? userAttrs[0] : []
}

const enumValues = ({ dataType }) => {
  return dataType
    .trim()
    .substring(enumPrefix.length)
    .split(',')
    .map(s => s.trim())
    .map(s => s.replace(/\s+/g, '_'))
}

const filterAttributes = predicate => (meta, entityCode) =>
  ownAttributeEntries(meta, entityCode)
    .filter(predicate)
const filterToOne = filterAttributes(isToOne)
const filterEnum = filterAttributes(isEnum)

const hasAttribute = predicate => (meta, entityCode) =>
  filterAttributes(predicate)(meta, entityCode).length > 0
const hasToOne = hasAttribute(isToOne)
const hasEnum = hasAttribute(isEnum)
const hasStatusEnum = hasAttribute(attributeEntry => isEnum(attributeEntry) && isStatus(attributeEntry))
const hasDate = hasAttribute(isDate)
const hasDateTime = hasAttribute(isDateTime)

const toOneTargets = (meta, entityCode) => {
  const arrays = entityCodes(meta)
    .map(referringEntityCode =>
      attributeEntries(meta, referringEntityCode)
        .filter(isToOne)
        .filter(([, { dataType }]) => extractEntityCodeFromRef(dataType) === entityCode)
        .map(attributeEntry => [referringEntityCode, attributeEntry]))
  return [].concat(...arrays)
}

const isToOneTarget = (meta, entityCode) => toOneTargets(meta, entityCode).length > 0

const primaryKey = (meta, entityCode) => filterAttributes(isPrimaryKey)(meta, entityCode)[0]

module.exports = {
  entityCodes,
  attributeEntries,
  isPrimaryKey,
  isToOne,
  isUnique,
  isNotNull,
  isEnum,
  isStatus,
  isDate,
  isDateTime,
  extractEntityCodeFromRef,
  explicitPKAttEntry,
  ownAttributeEntries,
  referredLabelAttribute,
  enumValues,
  filterToOne,
  filterEnum,
  hasToOne,
  hasEnum,
  hasStatusEnum,
  hasDate,
  hasDateTime,
  toOneTargets,
  isToOneTarget,
  primaryKey
}
