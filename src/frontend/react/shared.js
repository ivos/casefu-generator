const { paramCase, sentenceCase, noCase, camelCase, pascalCase } = require('change-case')
const pluralize = require('pluralize')

const pkg = entityCode => paramCase(entityCode)
const url = entityCode => paramCase(pluralize(entityCode))
const label = code => sentenceCase(code)
const labelPlural = code => sentenceCase(pluralize(code))
const labelLower = code => noCase(code)
const codeLower = code => camelCase(code)
const codeUpper = code => pascalCase(code)
const codePlural = code => pascalCase(pluralize(code))

module.exports = {
  pkg,
  url,
  label,
  labelPlural,
  labelLower,
  codeLower,
  codeUpper,
  codePlural
}
