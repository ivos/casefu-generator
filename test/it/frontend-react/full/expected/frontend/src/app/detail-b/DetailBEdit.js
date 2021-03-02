import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { MasterASelect } from '../master-a/MasterASelects'
import { MasterBSelect } from '../master-b/MasterBSelects'
import { updateDetailB, useDetailBEdit } from './detail-b-api'

export default () =>
  <EditScreen
    title="Edit detail b"
    entityTitle="Detail b"
    url="/detail-bs"
    useResourceEdit={useDetailBEdit}
    rows={5}
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
    update={data => updateDetailB(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={MasterASelect} name="masterA1" label="Master a1" sm={[2, 9]}/>
    <FieldGroup as={MasterASelect} name="masterA2" label="Master a2" sm={[2, 9]} required/>
    <FieldGroup as={MasterBSelect} name="masterB1" label="Master b1" sm={[2, 9]}/>
    <FieldGroup as={MasterBSelect} name="masterB2" label="Master b2" sm={[2, 9]} required/>

  </EditScreen>
