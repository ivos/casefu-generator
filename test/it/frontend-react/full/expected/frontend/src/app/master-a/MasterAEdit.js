import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { updateMasterA, useMasterAEdit } from './master-a-api'

export default () =>
  <EditScreen
    title="Edit master a"
    entityTitle="Master a"
    url="/master-as"
    useResourceEdit={useMasterAEdit}
    rows={2}
    validationSchema={
      Yup.object({
        code: Yup.string()
          .required(),
        name: Yup.string()
          .required()
      })
    }
    update={data => updateMasterA(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>

  </EditScreen>
