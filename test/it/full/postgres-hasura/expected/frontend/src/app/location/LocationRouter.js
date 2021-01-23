import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import LocationCreate from './LocationCreate'
import LocationEdit from './LocationEdit'
import LocationDetail from './LocationDetail'
import LocationList from './LocationList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <LocationCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <LocationEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <LocationDetail/>
      </Route>
      <Route path={path}>
        <LocationList/>
      </Route>
    </Switch>
  </>
}
