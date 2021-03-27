import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { MasterASelect } from '../master-a/MasterASelects'
import { createDetailA, detailAFromApi } from './detail-a-api'

export default () =>
  <CreateScreen
    title="Create detail a"
    entityTitle="Detail a"
    url="/detail-as"
    rows={3}
    fromApi={detailAFromApi}
    initialValues={{
      code: '',
      name: '',
      master: ''
    }}
    validationSchema={
      Yup.object({
        code: Yup.string()
          .required(),
        name: Yup.string()
          .required(),
        master: Yup.object().nullable()
          .required()
      })
    }
    create={createDetailA}>

    <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>
    <FieldGroup as={MasterASelect} name="master" label="Master" sm={[2, 9]} required/>

  </CreateScreen>
