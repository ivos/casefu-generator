import React from 'react'
import { Form } from 'react-bootstrap'
import { useFormikContext } from 'formik'

export default ({ name, ...rest }) => {
  const { errors, status } = useFormikContext()
  const error = errors[name]
  const serverError = status.serverErrors[name]

  return <>
    <Form.Control.Feedback type="invalid" {...rest}>
      {error || serverError}
    </Form.Control.Feedback>
  </>
}
