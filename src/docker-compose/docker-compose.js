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
    depends_on:
      - database
    restart: always
    network_mode: host # Linux only!
    ports:
      - "8000:8000"
    environment:
      HASURA_GRAPHQL_SERVER_PORT: 8000
      HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:postgres@localhost:5432/postgres # Linux
      # HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:postgres@host.docker.internal:5432/postgres # Mac
      # HASURA_GRAPHQL_DATABASE_URL: postgres://postgres:postgres@docker.for.win.localhost:5432/postgres # Windows
      HASURA_GRAPHQL_ENABLE_CONSOLE: "true"
      HASURA_GRAPHQL_DEV_MODE: "true"
      HASURA_GRAPHQL_ENABLED_LOG_TYPES: startup, http-log, webhook-log, websocket-log, query-log`

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
