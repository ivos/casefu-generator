import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { CountrySelect } from '../country/CountrySelects'
import { updateCustomer, useCustomerEdit } from './customer-api'

export default () =>
  <EditScreen
    title="Edit customer"
    entityTitle="Customer"
    url="/customers"
    useResourceEdit={useCustomerEdit}
    rows={2}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required(),
        country: Yup.object().nullable()
          .required()
      })
    }
    update={data => updateCustomer(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={CountrySelect} name="country" label="Country" sm={[2, 9]} required/>

  </EditScreen>
