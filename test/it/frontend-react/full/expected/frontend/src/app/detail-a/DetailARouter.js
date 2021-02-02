import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import DetailACreate from './DetailACreate'
import DetailAEdit from './DetailAEdit'
import DetailADetail from './DetailADetail'
import DetailAList from './DetailAList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <DetailACreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <DetailAEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <DetailADetail/>
      </Route>
      <Route path={path}>
        <DetailAList/>
      </Route>
    </Switch>
  </>
}
