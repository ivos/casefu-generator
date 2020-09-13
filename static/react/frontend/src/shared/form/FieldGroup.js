import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { ErrorMessage, Field } from '.'

export default ({ name, id = name, label, placeholder = label, required, sm, ...rest }) =>
  <Form.Group as={Row} id={`fieldGroup-${id}`}>
    <Form.Label column sm={sm[0]}>
      {label}
      {required && <span className="app-required">&nbsp;*</span>}
    </Form.Label>
    <Col sm={sm[1]}>
      <Field id={`field-${id}`} name={name} placeholder={placeholder} {...rest}/>
      <ErrorMessage name={name}/>
    </Col>
  </Form.Group>
