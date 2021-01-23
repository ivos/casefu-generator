import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import EventCreate from './EventCreate'
import EventEdit from './EventEdit'
import EventDetail from './EventDetail'
import EventList from './EventList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <EventCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <EventEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <EventDetail/>
      </Route>
      <Route path={path}>
        <EventList/>
      </Route>
    </Switch>
  </>
}
