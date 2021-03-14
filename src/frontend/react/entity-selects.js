const fs = require('fs')
const path = require('path')
const {
  referredLabelAttribute,
  primaryKey
} = require('../../meta/entity')
const { pkg, codeLower, codeUpper, codePlural } = require('./shared')

const generateSelects = (meta, targetDir, entityCode) => {
  const [labelAttributeCode] = referredLabelAttribute(meta, entityCode)

  const content = `import React from 'react'
import { AsyncSelect } from '../../shared'
import { list${codePlural(entityCode)}, use${entityCode} } from './${pkg(entityCode)}-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const ${codeLower(entityCode)}Label = data => data && entityLabel(', ', data.${labelAttributeCode})

export const ${entityCode}Select = props =>
  <AsyncSelect searchFn={query => list${codePlural(entityCode)}({ ${labelAttributeCode}: query })}
               getOptionValue={option => option.id}
               getOptionLabel={${codeLower(entityCode)}Label}
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
