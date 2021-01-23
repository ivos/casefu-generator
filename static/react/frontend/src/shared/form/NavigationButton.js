import React from 'react'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({ to, label, ...rest }) =>
  <Button variant="outline-secondary"
          as={NavLink} to={to}
          {...rest}>
    {label}&nbsp;
    <FontAwesomeIcon icon={'chevron-right'}/>
  </Button>
