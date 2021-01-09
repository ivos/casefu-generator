const { entityCodes } = require('../../meta/entity')
const { generateList } = require('./entity-list')
const { generateDetail } = require('./entity-detail')
const { generateRouter } = require('./entity-router')

const generateEntity = (meta, setup, entityCode) => {
  console.log('  - ' + entityCode)

  generateList(meta, setup, entityCode)
  generateDetail(meta, setup, entityCode)
  generateRouter(meta, setup, entityCode)
}

const generateEntities = (meta, setup) => {
  console.log('- Generating React UI for entities:')

  entityCodes(meta)
    .forEach(entityCode => generateEntity(meta, setup, entityCode))
}

module.exports = {
  generateEntities
}
