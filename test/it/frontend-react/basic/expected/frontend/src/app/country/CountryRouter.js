import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CountryCreate from './CountryCreate'
import CountryEdit from './CountryEdit'
import CountryDetail from './CountryDetail'
import CountryList from './CountryList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <CountryCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <CountryEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <CountryDetail/>
      </Route>
      <Route path={path}>
        <CountryList/>
      </Route>
    </Switch>
  </>
}
