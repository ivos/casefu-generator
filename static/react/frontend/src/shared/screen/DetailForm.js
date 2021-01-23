import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useMountedState } from 'react-use'
import { CancelLink, Revalidating } from '../form'

export default ({ id, useResourceGet, buttons, children }) => {
  const { data, isValidating, revalidate } = useResourceGet(id)
  const [isChanging, setIsChanging] = useState(false)
  const isMounted = useMountedState()

  const wrapAction = async fn => {
    setIsChanging(true)
    await fn()
    if (isMounted()) {
      revalidate()
      setIsChanging(false)
    }
  }

  return <>
    <Form>

      <Revalidating isValidating={isValidating}>
        {children(data)}
      </Revalidating>

      <Form.Group as={Row}>
        <Col sm={{ offset: 2, span: 9 }}>
          {buttons(data, { isValidating, isChanging, wrapAction })}

          <CancelLink/>
        </Col>
      </Form.Group>

    </Form>
  </>
}
