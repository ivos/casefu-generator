import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { updateCountry, useCountryEdit } from './country-api'

export default () =>
  <EditScreen
    title="Edit country"
    entityTitle="Country"
    url="/countries"
    useResourceEdit={useCountryEdit}
    rows={2}
    validationSchema={
      Yup.object({
        code: Yup.string(),
        name: Yup.string()
          .required()
      })
    }
    update={data => updateCountry(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>

  </EditScreen>
