const fs = require('fs')
const path = require('path')

const generate = (meta, setup) => {
  console.log('Generating Postgres SQL...')
  fs.writeFileSync(path.join(setup.outputDir, 'casefu-postgres.sql'), '')
}

module.exports = { generate }
