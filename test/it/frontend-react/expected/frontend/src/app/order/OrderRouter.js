import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OrderCreate from './OrderCreate'
import OrderEdit from './OrderEdit'
import OrderDetail from './OrderDetail'
import OrderList from './OrderList'

export default () => {
  const { path } = useRouteMatch()

  return <>
    <Switch>
      <Route path={`${path}/new`}>
        <OrderCreate/>
      </Route>
      <Route path={`${path}/:id/edit`}>
        <OrderEdit/>
      </Route>
      <Route path={`${path}/:id`}>
        <OrderDetail/>
      </Route>
      <Route path={path}>
        <OrderList/>
      </Route>
    </Switch>
  </>
}
