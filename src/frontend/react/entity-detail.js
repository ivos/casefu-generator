const fs = require('fs')
const path = require('path')
const {
  attributeEntries,
  isToOne,
  isEnum,
  isStatus,
  isDate,
  isDateTime,
  extractEntityCodeFromRef,
  explicitPKAttEntry,
  userAttributeEntries,
  referredLabelAttribute,
  enumValues,
  hasToOne,
  hasEnum,
  hasStatusEnum,
  hasDate,
  hasDateTime,
  hasTemporal,
  toOneTargets,
  isToOneTarget,
  primaryKey
} = require('../../meta/entity')
const { pkg, url, label, labelPlural, codeLower } = require('./shared')

const generateDetail = (meta, targetDir, entityCode) => {
  const field = ({ label, value, children }) =>
    children
      ? `
        <StaticGroup label="${label}" sm={[2, 10]}>${children}
        </StaticGroup>`
      : `
        <StaticGroup label="${label}" sm={[2, 10]} value={${value}}/>`
  const fields =
    userAttributeEntries(meta, entityCode)
      .map(attributeEntry => {
        const [attributeCode, { dataType }] = attributeEntry
        let value = `data.${attributeCode}`
        let children = null
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
          const [labelAttributeCode] = referredLabelAttribute(meta, referredEntityCode)
          const pkAttEntry = explicitPKAttEntry(meta, entityCode)
          const pkAttributeCode = pkAttEntry ? pkAttEntry[0] : 'id'
          if (labelAttributeCode) {
            children = `
          <Link to={\`/${url(referredEntityCode)}/\${data.${attributeCode}?.${pkAttributeCode}}\`}>
            {data.${attributeCode}?.${labelAttributeCode}}
          </Link>`
          }
        }
        return { label: label(attributeCode), value, children }
      })
      .map(field)

  let imports = `import React from 'react'
`
  if (hasToOne(meta, entityCode)) {
    imports += 'import { Link } from \'react-router-dom\'\n'
  }
  imports += 'import { DetailScreen, EditButton,'
  if (isToOneTarget(meta, entityCode)) {
    imports += ' NavigationButton,'
  }
  if (hasStatusEnum(meta, entityCode)) {
    imports += ' SavingButton,'
  }
  imports += ' StaticGroup } from \'../../shared\'\n'
  if (hasEnum(meta, entityCode)) {
    imports += 'import { sentenceCase } from \'change-case\'\n'
  }
  imports += 'import {'
  if (hasStatusEnum(meta, entityCode)) {
    imports += ` patch${entityCode},`
  }
  imports += ` use${entityCode} } from './${pkg(entityCode)}-api'\n`
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

  const patch = hasStatusEnum(meta, entityCode)
    ? `
const patch = (data, patch, wrapAction) => async () => {
  await wrapAction(() => patch${entityCode}(data.id, data.version, patch))
}
`
    : ''

  let buttonsFnArgs = ''
  if (hasStatusEnum(meta, entityCode) || isToOneTarget(meta, entityCode)) {
    buttonsFnArgs += 'data'
  }
  if (hasStatusEnum(meta, entityCode)) {
    buttonsFnArgs += ', { isValidating, isChanging, wrapAction }'
  }

  const actionButton = ({ code, label, isLast }) => `
          <SavingButton variant="warning" className="mr-${isLast ? '3' : '1'}"
                        disabled={isChanging || isValidating || ['${code}'].includes(data.status)}
                        onClick={patch(data, { status: '${code}' }, wrapAction)}>
            ${label}
          </SavingButton>`
  const actionButtonsForStatus = ([, attributeDef]) =>
    '\n' + enumValues(attributeDef)
      .map((code, index, array) => ({
        code,
        label: label(code),
        isLast: index === array.length - 1
      }))
      .map(actionButton)
      .join('')
  const actionButtonsForStatuses =
    attributeEntries(meta, entityCode)
      .filter(isStatus)
      .filter(isEnum)
      .map(actionButtonsForStatus)
      .join('\n')

  const navigationButton = ({ url, idCode, label }) => `
          <NavigationButton label="${label}" className="mr-3"
                            to={\`/${url}?${idCode}=\${data.id}\`}/>`
  let navigationButtons =
    toOneTargets(meta, entityCode)
      .map(([referringEntityCode, [attributeCode]]) => ({
        url: url(referringEntityCode),
        idCode: codeLower(`${attributeCode} ${primaryKey(meta, referringEntityCode)[0]}`),
        label: label(`${attributeCode} ${labelPlural(referringEntityCode)}`)
      }))
      .map(navigationButton)
      .join('')
  if (navigationButtons) {
    navigationButtons = '\n' + navigationButtons
  }

  const content = `${imports}${patch}
export default () =>
  <DetailScreen
    title="${label(entityCode)} detail"
    entityTitle="${label(entityCode)}"
    rows={${fields.length}}
    useResourceGet={use${entityCode}}
    buttons={
      (${buttonsFnArgs}) =>
        <>
          <EditButton className="mr-3" autoFocus/>${actionButtonsForStatuses}${navigationButtons}
        </>
    }>
    {data =>
      <>${fields.join('')}
      </>
    }
  </DetailScreen>
`

  const dir = path.join(targetDir, 'frontend', 'src', 'app', pkg(entityCode))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${entityCode}Detail.js`), content)
}

module.exports = {
  generateDetail
}
