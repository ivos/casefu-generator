const { paramCase, sentenceCase } = require('change-case')
const pluralize = require('pluralize')

const pkg = entityCode => paramCase(entityCode)
const url = entityCode => paramCase(pluralize(entityCode))
const labelPlural = entityCode => sentenceCase(pluralize(entityCode))

module.exports = {
  pkg,
  url,
  labelPlural
}
