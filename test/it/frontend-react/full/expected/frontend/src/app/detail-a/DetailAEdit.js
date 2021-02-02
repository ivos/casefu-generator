import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { MasterASelect } from '../master-a/MasterASelects'
import { updateDetailA, useDetailAEdit } from './detail-a-api'

export default () =>
  <EditScreen
    title="Edit detail a"
    entityTitle="Detail a"
    url="/detail-as"
    useResourceEdit={useDetailAEdit}
    rows={3}
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
    update={data => updateDetailA(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>
    <FieldGroup as={MasterASelect} name="master" label="Master" sm={[2, 9]} required/>

  </EditScreen>
