import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Form, Row } from 'react-bootstrap'
import { useFirstMountState, useMountedState } from 'react-use'
import { CancelLink, FormikForm, SaveButton, SkeletonForm } from '../form'

export default ({ url, useResourceEdit, id, rows, validationSchema, update, children }) => {
  const isMounted = useMountedState()
  const isFirstMount = useFirstMountState()
  const history = useHistory()
  const { data, isValidating } = useResourceEdit(id)

  const handleSubmit = async data => {
    await update(data)
    if (isMounted()) {
      history.push(`${url}/${id}`)
    }
  }

  if (isValidating || isFirstMount) {
    return <SkeletonForm rows={rows}/>
  }

  return <>
    <FormikForm initialValues={data}
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
