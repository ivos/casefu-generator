import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import PersonCreate from './PersonCreate'
import PersonEdit from './PersonEdit'
import PersonDetail from './PersonDetail'
import PersonList from './PersonList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <PersonCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <PersonEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <PersonDetail/>
      </Route>
      <Route path={path}>
        <PersonList/>
      </Route>
    </Switch>
  </>
}
