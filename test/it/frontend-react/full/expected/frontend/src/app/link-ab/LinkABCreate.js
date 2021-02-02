import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { MasterASelect } from '../master-a/MasterASelects'
import { MasterBSelect } from '../master-b/MasterBSelects'
import { createLinkAB } from './link-ab-api'

export default () =>
  <CreateScreen
    title="Create link ab"
    entityTitle="Link ab"
    url="/link-abs"
    rows={2}
    initialValues={{
      masterFirst: '',
      masterSecond: ''
    }}
    validationSchema={
      Yup.object({
        masterFirst: Yup.object().nullable()
          .required(),
        masterSecond: Yup.object().nullable()
          .required()
      })
    }
    create={createLinkAB}>

    <FieldGroup as={MasterASelect} name="masterFirst" label="Master first" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={MasterBSelect} name="masterSecond" label="Master second" sm={[2, 9]} required/>

  </CreateScreen>
