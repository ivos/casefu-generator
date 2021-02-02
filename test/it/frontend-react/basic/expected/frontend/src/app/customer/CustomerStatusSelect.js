import React from 'react'
import { Form } from 'react-bootstrap'

export default props =>
  <Form.Control as="select" {...props}>
    <option/>
    <option value="active">Active</option>
    <option value="disabled">Disabled</option>
  </Form.Control>
