import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { updateBranch, useBranchEdit } from './branch-api'

export default () =>
  <EditScreen
    title="Edit branch"
    entityTitle="Branch"
    url="/branches"
    useResourceEdit={useBranchEdit}
    rows={4}
    validationSchema={
      Yup.object({
        street: Yup.string(),
        city: Yup.string(),
        zipCode: Yup.string(),
        note: Yup.string()
      })
    }
    update={data => updateBranch(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="street" label="Street" sm={[2, 9]} autoFocus/>
    <FieldGroup as={Form.Control} name="city" label="City" sm={[2, 9]}/>
    <FieldGroup as={Form.Control} name="zipCode" label="Zip code" sm={[2, 9]}/>
    <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]}/>

  </EditScreen>
