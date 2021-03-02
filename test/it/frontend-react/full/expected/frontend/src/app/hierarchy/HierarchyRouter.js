import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import HierarchyCreate from './HierarchyCreate'
import HierarchyEdit from './HierarchyEdit'
import HierarchyDetail from './HierarchyDetail'
import HierarchyList from './HierarchyList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <HierarchyCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <HierarchyEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <HierarchyDetail/>
      </Route>
      <Route path={path}>
        <HierarchyList/>
      </Route>
    </Switch>
  </>
}
