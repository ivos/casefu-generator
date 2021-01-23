const fs = require('fs')
const path = require('path')
const {
  enumValues,
  filterEnum
} = require('../../meta/entity')
const { pkg, label, codeUpper } = require('./shared')

const generateEnumSelects = (meta, setup, entityCode) => {
  const generateEnumSelect = ([attributeCode, attributeDef]) => {
    const option = value => `
    <option value="${value}">${label(value)}</option>`
    const options =
      enumValues(attributeDef)
        .map(option)
        .join('')

    const content = `import React from 'react'
import { Form } from 'react-bootstrap'

export default props =>
  <Form.Control as="select" {...props}>
    <option/>${options}
  </Form.Control>
`

    const dir = path.join(setup.outputDir, 'frontend', 'src', 'app', pkg(entityCode))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, `${entityCode}${codeUpper(attributeCode)}Select.js`), content)
  }

  filterEnum(meta, entityCode)
    .forEach(generateEnumSelect)
}

module.exports = {
  generateEnumSelects
}
