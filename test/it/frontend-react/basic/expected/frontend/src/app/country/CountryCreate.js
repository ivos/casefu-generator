import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { createCountry } from './country-api'

export default () =>
  <CreateScreen
    title="Create country"
    entityTitle="Country"
    url="/countries"
    rows={2}
    initialValues={{
      code: '',
      name: ''
    }}
    validationSchema={
      Yup.object({
        code: Yup.string(),
        name: Yup.string()
          .required()
      })
    }
    create={createCountry}>

    <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>

  </CreateScreen>
