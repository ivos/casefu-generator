import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DetailBCreate from './DetailBCreate'
import DetailBEdit from './DetailBEdit'
import DetailBDetail from './DetailBDetail'
import DetailBList from './DetailBList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <DetailBCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <DetailBEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <DetailBDetail/>
      </Route>
      <Route path={path}>
        <DetailBList/>
      </Route>
    </Switch>
  </>
}
