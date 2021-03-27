const fs = require('fs')
const path = require('path')
const { distinct } = require('../../utils')
const {
  isPrimaryKey,
  isToOne,
  isEnum,
  isDate,
  isDateTime,
  extractEntityCodeFromRef,
  userAttributeEntries,
  referredLabelAttribute,
  filterToOne,
  hasEnum,
  hasDate,
  hasDateTime,
  hasTemporal,
  primaryKey
} = require('../../meta/entity')
const { pkg, codeLower, codeUpper, codePlural } = require('./shared')

const generateSelects = (meta, targetDir, entityCode) => {
  const [labelAttributeCode] = referredLabelAttribute(meta, entityCode)
  const labelValues = '\', \'' +
    userAttributeEntries(meta, entityCode)
      .filter(attributeEntry => !isPrimaryKey(attributeEntry))
      .map(attributeEntry => {
        const [attributeCode, { dataType }] = attributeEntry
        let value = `data.${attributeCode}`
        if (isEnum(attributeEntry)) {
          value = `sentenceCase(${value} || '')`
        }
        if (isDate(attributeEntry)) {
          value = `formatDate(${value})`
        }
        if (isDateTime(attributeEntry)) {
          value = `formatDateTime(${value})`
        }
        if (isToOne(attributeEntry)) {
          const referredEntityCode = extractEntityCodeFromRef(dataType)
          value = `${codeLower(referredEntityCode)}Label(${value})`
        }
        return `,\n  ${value}`
      })
      .join('')

  let imports = `import React from 'react'
`
  if (hasEnum(meta, entityCode)) {
    imports += 'import { sentenceCase } from \'change-case\'\n'
  }
  imports += filterToOne(meta, entityCode)
    .filter(attributeEntry => {
      const [, { dataType }] = attributeEntry
      const referredEntityCode = extractEntityCodeFromRef(dataType)
      return referredEntityCode !== entityCode
    })
    .map(attributeEntry => {
      const [, { dataType }] = attributeEntry
      const referredEntityCode = extractEntityCodeFromRef(dataType)
      return `import { ${codeLower(referredEntityCode)}Label } from '../${pkg(referredEntityCode)}/${referredEntityCode}Selects'\n`
    })
    .filter(distinct)
    .join('')
  imports += `import { AsyncSelect } from '../../shared'
import { list${codePlural(entityCode)}, use${entityCode} } from './${pkg(entityCode)}-api'
import { entityLabel, useRestored } from '../../shared/utils'
`
  if (hasTemporal(meta, entityCode)) {
    imports += 'import { '
    const items = []
    if (hasDate(meta, entityCode)) {
      items.push('formatDate')
    }
    if (hasDateTime(meta, entityCode)) {
      items.push('formatDateTime')
    }
    imports += items.join(', ') + ' } from \'../../i18n\'\n'
  }

  const content = `${imports}
export const ${codeLower(entityCode)}Label = data => data && entityLabel(${labelValues})

export const ${entityCode}Select = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => list${codePlural(entityCode)}({ ${labelAttributeCode}: query })}
               getOptionValue={option => option.id}
               getOptionLabel={${codeLower(entityCode)}Label}
               restoredValue={useRestored(name + '${codeUpper(primaryKey(meta, entityCode)[0])}', use${entityCode})}
               name={name}
               {...rest}/>
`

  const dir = path.join(targetDir, 'frontend', 'src', 'app', pkg(entityCode))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${entityCode}Selects.js`), content)
}

module.exports = {
  generateSelects
}
