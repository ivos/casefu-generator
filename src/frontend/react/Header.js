const fs = require('fs')
const path = require('path')
const { paramCase, sentenceCase } = require('change-case')
const pluralize = require('pluralize')
const { entityCodes } = require('../../meta/entity')

const generateHeaderJs = (meta, setup) => {
  console.log('- Generating React Header.js')

  const navItem = (url, label) => `
          <NavDropdown.Item as={NavLink} to="/${url}">${label}</NavDropdown.Item>`
  const navItems = entityCodes(meta)
    .map(entityCode => ({
      url: paramCase(pluralize(entityCode)),
      label: sentenceCase(pluralize(entityCode))
    }))
    .map(({ url, label }) => navItem(url, label))
    .join('')

  const content = `import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default () =>
  <Navbar bg="light" expand="sm" fixed="top">
    <Navbar.Brand href="#/">CaseFu</Navbar.Brand>
    <Navbar.Toggle aria-controls="app-navbar-nav"/>
    <Navbar.Collapse id="app-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
        <NavDropdown id="nav-dropdown" title="Entities">${navItems}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
`
  const dir = path.join(setup.outputDir, 'frontend', 'src', 'layout')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'Header.js'), content)
}

module.exports = {
  generateHeaderJs
}
