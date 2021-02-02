import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { MasterASelect } from '../master-a/MasterASelects'
import { MasterASelect } from '../master-a/MasterASelects'
import { MasterBSelect } from '../master-b/MasterBSelects'
import { MasterBSelect } from '../master-b/MasterBSelects'
import { createDetailB } from './detail-b-api'

export default () =>
  <CreateScreen
    title="Create detail b"
    entityTitle="Detail b"
    url="/detail-bs"
    rows={5}
    initialValues={{
      name: '',
      masterA1: '',
      masterA2: '',
      masterB1: '',
      masterB2: ''
    }}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required(),
        masterA1: Yup.object().nullable(),
        masterA2: Yup.object().nullable()
          .required(),
        masterB1: Yup.object().nullable(),
        masterB2: Yup.object().nullable()
          .required()
      })
    }
    create={createDetailB}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={MasterASelect} name="masterA1" label="Master a1" sm={[2, 9]}/>
    <FieldGroup as={MasterASelect} name="masterA2" label="Master a2" sm={[2, 9]} required/>
    <FieldGroup as={MasterBSelect} name="masterB1" label="Master b1" sm={[2, 9]}/>
    <FieldGroup as={MasterBSelect} name="masterB2" label="Master b2" sm={[2, 9]} required/>

  </CreateScreen>
