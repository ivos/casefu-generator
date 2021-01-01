const fs = require('fs')
const path = require('path')
const { pkg } = require('./shared')

const generateRouter = (meta, setup, entityCode) => {

  const content = `import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import ${entityCode}Create from './${entityCode}Create'
import ${entityCode}Edit from './${entityCode}Edit'
import ${entityCode}Detail from './${entityCode}Detail'
import ${entityCode}List from './${entityCode}List'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={\`\${path}/new\`}>
        <${entityCode}Create/>
      </Route>
      <Route path={\`\${path}/:id/edit\`}>
        <${entityCode}Edit/>
      </Route>
      <Route path={\`\${path}/:id\`}>
        <${entityCode}Detail/>
      </Route>
      <Route path={path}>
        <${entityCode}List/>
      </Route>
    </Switch>
  </>
}
`

  const dir = path.join(setup.outputDir, 'frontend', 'src', 'app', pkg(entityCode))
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${entityCode}Router.js`), content)
}

module.exports = {
  generateRouter
}
