import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import CustomerCreate from './CustomerCreate'
import CustomerEdit from './CustomerEdit'
import CustomerDetail from './CustomerDetail'
import CustomerList from './CustomerList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <CustomerCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <CustomerEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <CustomerDetail/>
      </Route>
      <Route path={path}>
        <CustomerList/>
      </Route>
    </Switch>
  </>
}
