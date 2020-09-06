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

const hasuraServices = () => `
  backend:
    image: hasura/graphql-engine
    ports:
      - "8080:8080"
    depends_on:
      - database
    restart: always
    environment:
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:postgres@localhost:5432/postgres
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
      ## enable debugging mode. It is recommended to disable this in production
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log
      ## uncomment next line to set an admin secret
      # HASURA_GRAPHQL_ADMIN_SECRET: myadminsecretkey`

const generate = (setup) => {
  console.log('- Generating Docker Compose "docker-compose.yaml"')
  let services = ''
  let volumes = ''
  const { generate } = setup
  if (generate) {
    const { database, backend } = generate
    if (database === 'Postgres') {
      services += postgresServices()
      volumes += postgresVolumes()
    }
    if (backend === 'Hasura') {
      services += hasuraServices()
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
