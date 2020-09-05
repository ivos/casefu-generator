const fs = require('fs')
const { inspect } = require('util')
const postgres = require('./sql/postgres')

const generate = (meta, setup) => {
  console.log('Generating for setup:', inspect(setup, { depth: null }))
  if (!fs.existsSync(setup.outputDir)) {
    fs.mkdirSync(setup.outputDir, { recursive: true })
  }
  const { generate } = setup
  if (generate) {
    const { fromDataModel } = generate
    if (fromDataModel) {
      const { SQL } = fromDataModel
      if (SQL) {
        const { Postgres } = SQL
        if (Postgres === true) {
          postgres.generate(meta, setup)
        }
      }
    }
  }
}

module.exports = {
  generate
}