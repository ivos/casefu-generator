import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { spinnerDelay } from '../../constants'

export default ({ saving, onClick, disabled, children, ...rest }) => {
  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSpinner(true)
    }, spinnerDelay)
    return () => {
      window.clearTimeout(timer)
    }
  }, [spinner])

  const handleClick = (...args) => {
    setSpinner(false)
    onClick && onClick(...args)
  }

  return <>
    <Button disabled={saving || disabled}
            onClick={handleClick}
            {...rest}>
      {children}
    </Button>
    {saving && spinner &&
    <FontAwesomeIcon icon="spinner" fixedWidth size="lg" spin
                     className="ml-1 mr-3"/>
    }
  </>
}
