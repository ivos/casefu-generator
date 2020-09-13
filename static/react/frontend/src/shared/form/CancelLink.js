import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const stripLastSegment = url => url.substring(0, url.lastIndexOf('/'))

export default ({ to, children, ...rest }) => {
  const location = useLocation()
  to = to || stripLastSegment(location.pathname)

  return (
    <Link to={to} className="float-right" {...rest}>
      {children ||
      <>
        <FontAwesomeIcon icon="times"/>
        &nbsp;Cancel
      </>}
    </Link>
  )
}
