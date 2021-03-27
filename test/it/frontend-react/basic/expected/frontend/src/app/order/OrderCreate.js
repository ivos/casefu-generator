import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, DatePicker, DateTimePicker, FieldGroup } from '../../shared'
import { CustomerSelect } from '../customer/CustomerSelects'
import { createOrder, orderFromApi } from './order-api'

export default () =>
  <CreateScreen
    title="Create order"
    entityTitle="Order"
    url="/orders"
    rows={5}
    fromApi={orderFromApi}
    initialValues={{
      orderNumber: '',
      customer: '',
      received: '',
      deliveryDate: '',
      note: ''
    }}
    validationSchema={
      Yup.object({
        orderNumber: Yup.string()
          .required(),
        customer: Yup.object().nullable()
          .required(),
        received: Yup.date().nullable()
          .required(),
        deliveryDate: Yup.date().nullable()
          .required(),
        note: Yup.string()
      })
    }
    create={createOrder}>

    <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={CustomerSelect} name="customer" label="Customer" sm={[2, 9]} required/>
    <FieldGroup as={DateTimePicker} name="received" label="Received" sm={[2, 9]} required/>
    <FieldGroup as={DatePicker} name="deliveryDate" label="Delivery date" sm={[2, 9]} required/>
    <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]}/>

  </CreateScreen>
