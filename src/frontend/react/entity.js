const { entityCodes } = require('../../meta/entity')
const { generateList } = require('./entity-list')
const { generateDetail } = require('./entity-detail')
const { generateCreate } = require('./entity-create')
const { generateEdit } = require('./entity-edit')
const { generateRouter } = require('./entity-router')
const { generateSelects } = require('./entity-selects')
const { generateEnumSelects } = require('./entity-enum-select')
const { generateApi } = require('./entity-api')

const generateEntity = (meta, targetDir, entityCode) => {
  console.log('  - ' + entityCode)

  generateList(meta, targetDir, entityCode)
  generateDetail(meta, targetDir, entityCode)
  generateCreate(meta, targetDir, entityCode)
  generateEdit(meta, targetDir, entityCode)
  generateRouter(meta, targetDir, entityCode)
  generateSelects(meta, targetDir, entityCode)
  generateEnumSelects(meta, targetDir, entityCode)
  generateApi(meta, targetDir, entityCode)
}

const generateEntities = (meta, targetDir) => {
  console.log('- Generating React UI for entities:')

  entityCodes(meta)
    .forEach(entityCode => generateEntity(meta, targetDir, entityCode))
}

module.exports = {
  generateEntities
}
