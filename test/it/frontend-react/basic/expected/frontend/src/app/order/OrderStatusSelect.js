import React from 'react'
import { Form } from 'react-bootstrap'

export default props =>
  <Form.Control as="select" {...props}>
    <option/>
    <option value="created">Created</option>
    <option value="submitted">Submitted</option>
    <option value="delivered">Delivered</option>
  </Form.Control>
