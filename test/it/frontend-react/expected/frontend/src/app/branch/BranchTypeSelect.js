import React from 'react'
import { Form } from 'react-bootstrap'

export default props =>
  <Form.Control as="select" {...props}>
    <option/>
    <option value="delivery">Delivery</option>
    <option value="invoicing">Invoicing</option>
  </Form.Control>
