const fs = require('fs')
const path = require('path')
const {
  isToOne,
  isNotNull,
  isEnum,
  isDate,
  isDateTime,
  extractEntityCodeFromRef,
  ownAttributeEntries,
  filterToOne,
  hasDate,
  hasDateTime
} = require('../../meta/entity')
const { pkg, url, label, labelLower, codeUpper } = require('./shared')

const generateEdit = (meta, setup, entityCode) => {
  const attributeEntrires =
    ownAttributeEntries(meta, entityCode)
      .filter(([_, { status }]) => !['APK', 'S', 'V'].includes(status))

  const validationSchemaDef = ({ attributeCode, type, isRequired }) => {
    let result = `
        ${attributeCode}: Yup.${type}`
    if (isRequired) {
      result += `
          .required()`
    }
    return result
  }
  const validationSchemaDefs =
    attributeEntrires
      .map(attributeEntry => {
        const [attributeCode] = attributeEntry
        let type = 'string()'
        if (isToOne(attributeEntry)) {
          type = 'object().nullable()'
        }
        if (isDate(attributeEntry) || isDateTime(attributeEntry)) {
          type = 'date().nullable()'
        }
        const isRequired = isNotNull(attributeEntry)
        return ({ attributeCode, type, isRequired })
      })
      .map(validationSchemaDef)

  const field = ({ attributeCode, control, label, isRequired, isFirst }) => {
    let result = `
    <FieldGroup as={${control}} name="${attributeCode}" label="${label}" sm={[2, 9]}`
    if (isRequired) {
      result += ' required'
    }
    if (isFirst) {
      result += ' autoFocus'
    }
    result += `/>`
    return result
  }
  const fields =
    attributeEntrires
      .map((attributeEntry, index) => {
        const [attributeCode, { dataType }] = attributeEntry
        let control = 'Form.Control'
        if (isToOne(attributeEntry)) {
          const referredEntityCode = extractEntityCodeFromRef(dataType)
          control = `${referredEntityCode}Select`
        }
        if (isEnum(attributeEntry)) {
          control = `${entityCode}${codeUpper(attributeCode)}Select`
        }
        if (isDate(attributeEntry)) {
          control = 'DatePicker'
        }
        if (isDateTime(attributeEntry)) {
          control = 'DateTimePicker'
        }
        return {
          attributeCode,
          control,
          label: label(attributeCode),
          isRequired: isNotNull(attributeEntry),
          isFirst: index === 0
        }
      })
      .map(field)

  let imports = `import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
`
  imports += `import {`
  if (hasDate(meta, entityCode)) {
    imports += ` DatePicker,`
  }
  if (hasDateTime(meta, entityCode)) {
    imports += ` DateTimePicker,`
  }
  imports += ` EditScreen, FieldGroup } from '../../shared'\n`
  imports += filterToOne(meta, entityCode)
    .map(([, { dataType }]) => {
      const referredEntityCode = extractEntityCodeFromRef(dataType)
      return `import { ${referredEntityCode}Select } from '../${pkg(referredEntityCode)}/${referredEntityCode}Selects'\n`
    })
    .join('')
  imports += `import { update${entityCode}, use${entityCode}Edit } from './${pkg(entityCode)}-api'\n`

  const content = `${imports}
export default () =>
  <EditScreen
    title="Edit ${labelLower(entityCode)}"
    entityTitle="${label(entityCode)}"
    url="/${url(entityCode)}"
    useResourceEdit={use${entityCode}Edit}
    rows={${fields.length}}
    validationSchema={
      Yup.object({${validationSchemaDefs}
      })
    }
    update={data => update${entityCode}(data.id, data.version, data)}>
${fields.join('')}

  </EditScreen>
`

  const dir = path.join(setup.outputDir, 'frontend', 'src', 'app', pkg(entityCode))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${entityCode}Edit.js`), content)
}

module.exports = {
  generateEdit
}
