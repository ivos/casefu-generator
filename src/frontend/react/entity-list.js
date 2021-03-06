const fs = require('fs')
const path = require('path')
const { distinct } = require('../../utils')
const {
  isToOne,
  isEnum,
  isDate,
  isDateTime,
  extractEntityCodeFromRef,
  userAttributeEntries,
  filterToOne,
  filterEnum,
  hasEnum,
  hasDate,
  hasDateTime,
  hasTemporal
} = require('../../meta/entity')
const {
  url, pkg, label, labelPlural, labelLower, codeLower, codeUpper, codePlural
} = require('./shared')

const generateList = (meta, targetDir, entityCode) => {
  const columnHeader = ({ label }) => `
        <th>${label}</th>`
  const columnHeaders =
    userAttributeEntries(meta, entityCode)
      .map(([attributeCode, _]) => ({
        label: label(attributeCode)
      }))
      .map(columnHeader)

  const tableValue = ({ value }) => `
        <td>{${value}}</td>`
  const tableValues =
    userAttributeEntries(meta, entityCode)
      .map(attributeEntry => {
        const [attributeCode, { dataType }] = attributeEntry
        let value = `item.${attributeCode}`
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
        return { value }
      })
      .map(tableValue)
      .join('')

  const initialValue = ({ attributeCode }) => `  ${attributeCode}: ''`
  const initialValues = () => {
    const arrays = userAttributeEntries(meta, entityCode)
      .map(attributeEntry => {
        const [attributeCode] = attributeEntry
        if (isDate(attributeEntry) || isDateTime(attributeEntry)) {
          return [
            { attributeCode: `${attributeCode}From` },
            { attributeCode: `${attributeCode}To` }
          ]
        }
        return [{ attributeCode }]
      })
    return [].concat(...arrays)
      .map(initialValue)
      .join(',\n')
  }

  const searchField = ({ attributeCode, control, label }) => `
        <FieldGroup as={${control}} name="${attributeCode}" label="${label}" sm={[2, 9]} isValid={false}/>`
  const searchFields =
    userAttributeEntries(meta, entityCode)
      .map(attributeEntry => {
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
          control = 'DateRangePicker'
        }
        if (isDateTime(attributeEntry)) {
          control = 'DateTimeRangePicker'
        }
        return {
          attributeCode,
          control,
          label: label(attributeCode)
        }
      })
      .map(searchField)

  let imports = `import React from 'react'
import { Form } from 'react-bootstrap'
`
  if (hasEnum(meta, entityCode)) {
    imports += 'import { sentenceCase } from \'change-case\'\n'
  }
  imports += 'import { CreateButton,'
  if (hasDate(meta, entityCode)) {
    imports += ' DateRangePicker,'
  }
  if (hasDateTime(meta, entityCode)) {
    imports += ' DateTimeRangePicker,'
  }
  imports += ' FieldGroup, ListScreen } from \'../../shared\'\n'
  imports += filterToOne(meta, entityCode)
    .map(([, { dataType }]) => dataType)
    .filter(distinct)
    .map(dataType => {
      const referredEntityCode = extractEntityCodeFromRef(dataType)
      return `import { ${codeLower(referredEntityCode)}Label, ${referredEntityCode}Select }` +
        ` from '../${pkg(referredEntityCode)}/${referredEntityCode}Selects'\n`
    })
    .join('')
  imports += filterEnum(meta, entityCode)
    .map(([attributeCode]) => `${entityCode}${codeUpper(attributeCode)}Select`)
    .map(name => `import ${name} from './${name}'\n`)
    .join('')
  imports += `import { ${codeLower(entityCode)}FromApi, ${codeLower(entityCode)}ToApi, use${codePlural(entityCode)} }` +
    ` from './${pkg(entityCode)}-api'\n`
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
let searchValuesCache = {
${initialValues()}
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        ${labelPlural(entityCode)}
        <CreateButton to="/${url(entityCode)}/new" title="Create new ${labelLower(entityCode)}..."
                      initialValues={${codeLower(entityCode)}ToApi(searchValuesCache)}/>
      </>
    }
    url="/${url(entityCode)}"
    useResourceList={use${codePlural(entityCode)}}
    toApi={${codeLower(entityCode)}ToApi}
    fromApi={${codeLower(entityCode)}FromApi}
    searchFormRows={${searchFields.length}}
    searchFormContent={
      <>${searchFields.join('')}
      </>
    }
    columns={${columnHeaders.length}}
    tableHeader={
      <>${columnHeaders.join('')}
      </>
    }
    tablePageContent={
      item => <>${tableValues}
      </>
    }
  />
`

  const dir = path.join(targetDir, 'frontend', 'src', 'app', pkg(entityCode))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${entityCode}List.js`), content)
}

module.exports = {
  generateList
}
