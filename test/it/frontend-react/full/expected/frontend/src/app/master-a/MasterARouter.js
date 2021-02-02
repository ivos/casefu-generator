import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MasterACreate from './MasterACreate'
import MasterAEdit from './MasterAEdit'
import MasterADetail from './MasterADetail'
import MasterAList from './MasterAList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <MasterACreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <MasterAEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <MasterADetail/>
      </Route>
      <Route path={path}>
        <MasterAList/>
      </Route>
    </Switch>
  </>
}
