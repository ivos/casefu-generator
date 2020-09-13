import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'

export default props => {
  const location = useLocation()

  return <>
    <Button variant="outline-secondary"
            as={NavLink} to={`${location.pathname}/edit`}
            {...props}>
      <FontAwesomeIcon icon={['far', 'edit']}/>
      &nbsp;Edit
    </Button>
  </>
}
