import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { createMasterB } from './master-b-api'

export default () =>
  <CreateScreen
    title="Create master b"
    entityTitle="Master b"
    url="/master-bs"
    rows={1}
    initialValues={{
      name: ''
    }}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required()
      })
    }
    create={createMasterB}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

  </CreateScreen>
