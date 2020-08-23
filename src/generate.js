const fs = require('fs')
const { inspect } = require('util')
const postgres = require('./sql/postgres')

const generate = (meta, setup) => {
  console.log('Generating for setup:', inspect(setup, { depth: null }))
  if (!fs.existsSync(setup.outputDir)) {
    fs.mkdirSync(setup.outputDir, { recursive: true })
  }
  if (setup.generate) {
    if (setup.generate.fromDataModel) {
      if (setup.generate.fromDataModel.SQL) {
        if (setup.generate.fromDataModel.SQL.Postgres === true) {
          postgres.generate(meta, setup)
        }
      }
    }
  }
}

module.exports = {
  generate
}
