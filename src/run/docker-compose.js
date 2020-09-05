const fs = require('fs')
const path = require('path')

const postgresServices = () => `
  postgres:
    image: postgres
    restart: always
    volumes:
      - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
    ports:
    - "5432:5432"`
const postgresVolumes = () => `
  db_data:`

const generate = (setup) => {
  console.log('Generating Docker Compose file...')
  let services = ''
  let volumes = ''
  const { run } = setup
  const { database } = run
  if (database === 'Postgres') {
    services += postgresServices()
    volumes += postgresVolumes()
  }
  if (services) {
    services = '\nservices:' + services
  }
  if (volumes) {
    volumes = '\nvolumes:' + volumes
  }
  const content = `version: '3.6'${services}${volumes}
`
  fs.writeFileSync(path.join(setup.outputDir, 'docker-compose.yaml'), content)
}

module.exports = { generate }
