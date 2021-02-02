import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { updateMasterB, useMasterBEdit } from './master-b-api'

export default () =>
  <EditScreen
    title="Edit master b"
    entityTitle="Master b"
    url="/master-bs"
    useResourceEdit={useMasterBEdit}
    rows={1}
    validationSchema={
      Yup.object({
        name: Yup.string()
          .required()
      })
    }
    update={data => updateMasterB(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required autoFocus/>

  </EditScreen>
