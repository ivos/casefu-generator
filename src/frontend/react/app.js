const fs = require('fs')
const path = require('path')
const { entityCodes } = require('../../meta/entity')
const { pkg, url } = require('./shared')

const generateAppJs = (meta, setup) => {
  console.log('- Generating React "App.js"')

  const importFn = ({ entityCode, pkg }) => `
import ${entityCode}Router from './app/${pkg}/${entityCode}Router'`
  const imports = entityCodes(meta)
    .map(entityCode => ({
      entityCode,
      pkg: pkg(entityCode)
    }))
    .map(importFn)
    .join('')

  const route = ({ url, entityCode }) => `
        <Route path="/${url}">
          <${entityCode}Router/>
        </Route>`
  const routes = entityCodes(meta)
    .map(entityCode => ({
      url: url(entityCode),
      entityCode
    }))
    .map(route)
    .join('')

  const content = `import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Home from './layout/Home'${imports}

export default () =>
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>${routes}
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Container>
  </Router>
`
  const dir = path.join(setup.outputDir, 'frontend', 'src')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'App.js'), content)
}

module.exports = {
  generateAppJs
}
