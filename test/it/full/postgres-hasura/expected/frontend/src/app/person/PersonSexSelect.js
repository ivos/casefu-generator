import React from 'react'
import { Form } from 'react-bootstrap'

export default props =>
  <Form.Control as="select" {...props}>
    <option/>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </Form.Control>
