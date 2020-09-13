import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Home from './layout/Home'
import CustomersList from './app/customers/CustomersList'

export default () => (
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>
        <Route path="/customers">
          <CustomersList/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Container>
  </Router>
)
