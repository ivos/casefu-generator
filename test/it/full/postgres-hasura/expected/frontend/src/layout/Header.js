import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default () =>
  <Navbar bg="light" expand="sm" fixed="top">
    <Navbar.Brand href="#/">CaseFu</Navbar.Brand>
    <Navbar.Toggle aria-controls="app-navbar-nav"/>
    <Navbar.Collapse id="app-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
        <NavDropdown id="nav-dropdown" title="Entities">
          <NavDropdown.Item as={NavLink} to="/people">People</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/locations">Locations</NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/events">Events</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
