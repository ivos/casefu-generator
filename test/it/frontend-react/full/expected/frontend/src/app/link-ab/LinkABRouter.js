import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import LinkABCreate from './LinkABCreate'
import LinkABEdit from './LinkABEdit'
import LinkABDetail from './LinkABDetail'
import LinkABList from './LinkABList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <LinkABCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <LinkABEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <LinkABDetail/>
      </Route>
      <Route path={path}>
        <LinkABList/>
      </Route>
    </Switch>
  </>
}
