import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ to, title }) =>
  <Button as={Link} to={to}
          variant="outline-secondary" className="float-right"
          title={title}>
    <FontAwesomeIcon icon="plus"/>
    &nbsp;Create
  </Button>
