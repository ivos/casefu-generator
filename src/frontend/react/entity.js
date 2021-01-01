const { entityCodes } = require('../../meta/entity')
const { generateRouter } = require('./entity-router')

const generateEntity = (meta, setup, entityCode) => {
  console.log('  - ' + entityCode)

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
