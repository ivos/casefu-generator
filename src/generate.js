const fs = require('fs')
const { inspect } = require('util')
const postgres = require('./sql/postgres')
const dockerCompose = require('./run/docker-compose')

const generate = (meta, setup) => {
  console.log('Generating for setup:', inspect(setup, { depth: null }))
  if (!setup.outputDir) {
    throw new Error('Missing required key in setup: "outputDir"')
  }
  if (!fs.existsSync(setup.outputDir)) {
    fs.mkdirSync(setup.outputDir, { recursive: true })
  }
  const { generate } = setup
  if (generate) {
    const { database } = generate
    if (database === 'Postgres') {
      postgres.generateCreateTables(meta, setup)
      postgres.generateDockerfile(setup)
    }
  }
  dockerCompose.generate(setup)
  console.log('Generating finished successfully.')
}

module.exports = {
  generate
}
