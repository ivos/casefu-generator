const fs = require('fs')
const path = require('path')
const { entityCodes } = require('../../meta/entity')
const { url, labelPlural } = require('./shared')

const generateHeaderJs = (meta, targetDir) => {
  console.log('- Generating React "Header.js"')

  const navItem = ({ url, label }) => `
          <NavDropdown.Item as={NavLink} to="/${url}">${label}</NavDropdown.Item>`
  const navItems = entityCodes(meta)
    .map(entityCode => ({
      url: url(entityCode),
      label: labelPlural(entityCode)
    }))
    .map(navItem)
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
  const dir = path.join(targetDir, 'frontend', 'src', 'layout')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'Header.js'), content)
}

module.exports = {
  generateHeaderJs
}
