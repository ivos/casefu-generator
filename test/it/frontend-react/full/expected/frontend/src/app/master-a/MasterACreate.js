import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { createMasterA, masterAFromApi } from './master-a-api'

export default () =>
  <CreateScreen
    title="Create master a"
    entityTitle="Master a"
    url="/master-as"
    rows={2}
    fromApi={masterAFromApi}
    initialValues={{
      code: '',
      name: ''
    }}
    validationSchema={
      Yup.object({
        code: Yup.string()
          .required(),
        name: Yup.string()
          .required()
      })
    }
    create={createMasterA}>

    <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>

  </CreateScreen>
