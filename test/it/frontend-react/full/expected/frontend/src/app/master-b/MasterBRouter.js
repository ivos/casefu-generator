import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MasterBCreate from './MasterBCreate'
import MasterBEdit from './MasterBEdit'
import MasterBDetail from './MasterBDetail'
import MasterBList from './MasterBList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <MasterBCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <MasterBEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <MasterBDetail/>
      </Route>
      <Route path={path}>
        <MasterBList/>
      </Route>
    </Switch>
  </>
}
