import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { useMountedState } from 'react-use'
import { CancelLink, FormikForm, SaveButton } from '../form'

export default ({ url, initialValues, validationSchema, create, children }) => {
  const isMounted = useMountedState()
  const history = useHistory()

  const handleSubmit = async data => {
    const { id } = await create(data)
    if (isMounted()) {
      history.push(`${url}/${id}`)
    }
  }

  return <>
    <FormikForm initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
      {children}

      <Form.Group as={Row}>
        <Col sm={{ offset: 2, span: 9 }}>
          <SaveButton/>
          <CancelLink/>
        </Col>
      </Form.Group>
    </FormikForm>
  </>
}
