import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Home from './layout/Home'
import CountryRouter from './app/country/CountryRouter'
import CustomerRouter from './app/customer/CustomerRouter'
import OrderRouter from './app/order/OrderRouter'
import BranchRouter from './app/branch/BranchRouter'

export default () =>
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>
        <Route path="/countries">
          <CountryRouter/>
        </Route>
        <Route path="/customers">
          <CustomerRouter/>
        </Route>
        <Route path="/orders">
          <OrderRouter/>
        </Route>
        <Route path="/branches">
          <BranchRouter/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      <Footer/>
    </Container>
  </Router>
