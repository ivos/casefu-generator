const { entityCodes } = require('../../meta/entity')
const { generateList } = require('./entity-list')
const { generateDetail } = require('./entity-detail')
const { generateCreate } = require('./entity-create')
const { generateEdit } = require('./entity-edit')
const { generateRouter } = require('./entity-router')
const { generateSelects } = require('./entity-selects')
const { generateEnumSelects } = require('./entity-enum-select')
const { generateApi } = require('./entity-api')

const generateEntity = (meta, setup, entityCode) => {
  console.log('  - ' + entityCode)

  generateList(meta, setup, entityCode)
  generateDetail(meta, setup, entityCode)
  generateCreate(meta, setup, entityCode)
  generateEdit(meta, setup, entityCode)
  generateRouter(meta, setup, entityCode)
  generateSelects(meta, setup, entityCode)
  generateEnumSelects(meta, setup, entityCode)
  generateApi(meta, setup, entityCode)
}

const generateEntities = (meta, setup) => {
  console.log('- Generating React UI for entities:')

  entityCodes(meta)
    .forEach(entityCode => generateEntity(meta, setup, entityCode))
}

module.exports = {
  generateEntities
}
