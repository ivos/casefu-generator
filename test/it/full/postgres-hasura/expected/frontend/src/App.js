import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Home from './layout/Home'
import PersonRouter from './app/person/PersonRouter'
import LocationRouter from './app/location/LocationRouter'
import EventRouter from './app/event/EventRouter'

export default () =>
  <Router>
    <Header/>
    <Container id="app-container" fluid>
      <Switch>
        <Route path="/people">
          <PersonRouter/>
        </Route>
        <Route path="/locations">
          <LocationRouter/>
        </Route>
        <Route path="/events">
          <EventRouter/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
      <Footer/>
    </Container>
  </Router>
