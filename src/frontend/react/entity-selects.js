const fs = require('fs')
const path = require('path')
const {
  referredLabelAttribute,
  primaryKey
} = require('../../meta/entity')
const { pkg, codeUpper, codePlural } = require('./shared')

const generateSelects = (meta, targetDir, entityCode) => {
  const attributeEntry = referredLabelAttribute(meta, entityCode)
  const [attributeCode, { dataType }] = attributeEntry
  if (isToOne(attributeEntry)) {

  }

  const content = `import React from 'react'
import { AsyncSelect } from '../../shared'
import { list${codePlural(entityCode)}, use${entityCode} } from './${pkg(entityCode)}-api'
import { useRestored } from '../../shared/utils'

export const ${entityCode}Select = props =>
  <AsyncSelect searchFn={query => list${codePlural(entityCode)}({ ${labelAttributeCode}: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.${labelAttributeCode}}
               {...props}/>

export const ${entityCode}SearchSelect = ({ name, ...rest }) =>
  <${entityCode}Select
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
