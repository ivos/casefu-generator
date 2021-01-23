const fs = require('fs')
const { inspect } = require('util')
const { generatePostgres } = require('./database/postgres')
const { generateReact } = require('./frontend/react')
const dockerCompose = require('./docker-compose/docker-compose')

const generate = (meta, setup, moduleDir, targetDir) => {
  console.log('Generating for setup:', inspect(setup, { depth: null }))
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }
  const { generate } = setup
  if (generate) {
    const { database, frontend } = generate
    if (database === 'Postgres') {
      generatePostgres(meta, targetDir)
    }
    if (frontend === 'React') {
      generateReact(meta, moduleDir, targetDir)
    }
  }
  dockerCompose.generate(setup, targetDir)
  console.log('Generating finished successfully.')
}

module.exports = {
  generate
}
