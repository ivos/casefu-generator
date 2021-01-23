import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export default ({ label, sm, value, children }) =>
  <Form.Group as={Row}>
    <Form.Label column sm={sm[0]}>
      {label}
    </Form.Label>
    <Col sm={sm[1]} style={{ paddingTop: 6 }}>
      {value || children}
    </Col>
  </Form.Group>
