import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { createBranch } from './branch-api'

export default () =>
  <CreateScreen
    title="Create branch"
    entityTitle="Branch"
    url="/branches"
    rows={4}
    initialValues={{
      street: '',
      city: '',
      zipCode: '',
      note: ''
    }}
    validationSchema={
      Yup.object({
        street: Yup.string(),
        city: Yup.string(),
        zipCode: Yup.string(),
        note: Yup.string()
      })
    }
    create={createBranch}>

    <FieldGroup as={Form.Control} name="street" label="Street" sm={[2, 9]} autoFocus/>
    <FieldGroup as={Form.Control} name="city" label="City" sm={[2, 9]}/>
    <FieldGroup as={Form.Control} name="zipCode" label="Zip code" sm={[2, 9]}/>
    <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]}/>

  </CreateScreen>
