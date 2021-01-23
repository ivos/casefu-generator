import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import BranchCreate from './BranchCreate'
import BranchEdit from './BranchEdit'
import BranchDetail from './BranchDetail'
import BranchList from './BranchList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <BranchCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <BranchEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <BranchDetail/>
      </Route>
      <Route path={path}>
        <BranchList/>
      </Route>
    </Switch>
  </>
}
