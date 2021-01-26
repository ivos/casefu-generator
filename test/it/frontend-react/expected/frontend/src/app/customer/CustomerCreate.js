import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { CountrySelect } from '../country/CountrySelects'
import { createCustomer } from './customer-api'

export default () =>
  <CreateScreen
    title="Create customer"
    entityTitle="Customer"
    url="/customers"
    rows={2}
    initialValues={{
      name: '',
      country: ''
    }}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required(),
        country: Yup.object().nullable()
          .required()
      })
    }
    create={createCustomer}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={CountrySelect} name="country" label="Country" sm={[2, 9]} required/>

  </CreateScreen>
