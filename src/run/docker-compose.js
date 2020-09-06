const fs = require('fs')
const path = require('path')

const postgresServices = () => `
  database:
    build: ./postgres
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
  console.log('- Generating Docker Compose "docker-compose.yaml"')
  let services = ''
  let volumes = ''
  const { generate } = setup
  if (generate) {
    const { database } = generate
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
  }
  const content = `version: '3.6'${services}${volumes}
`
  fs.writeFileSync(path.join(setup.outputDir, 'docker-compose.yaml'), content)
}

module.exports = { generate }
