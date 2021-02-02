import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Home from './layout/Home'
import MasterARouter from './app/master-a/MasterARouter'
import MasterBRouter from './app/master-b/MasterBRouter'
import DetailARouter from './app/detail-a/DetailARouter'
import DetailBRouter from './app/detail-b/DetailBRouter'
import LinkABRouter from './app/link-ab/LinkABRouter'

export default () =>
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>
        <Route path="/master-as">
          <MasterARouter/>
        </Route>
        <Route path="/master-bs">
          <MasterBRouter/>
        </Route>
        <Route path="/detail-as">
          <DetailARouter/>
        </Route>
        <Route path="/detail-bs">
          <DetailBRouter/>
        </Route>
        <Route path="/link-abs">
          <LinkABRouter/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Container>
  </Router>
