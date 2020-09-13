const fs = require('fs')
const { inspect } = require('util')
const { generatePostgres } = require('./database/postgres')
const { generateReact } = require('./frontend/react')
const dockerCompose = require('./docker-compose/docker-compose')

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
    const { database, frontend } = generate
    if (database === 'Postgres') {
      generatePostgres(meta, setup)
    }
    if (frontend === 'React') {
      generateReact(meta, setup)
    }
  }
  dockerCompose.generate(setup)
  console.log('Generating finished successfully.')
}

module.exports = {
  generate
}
