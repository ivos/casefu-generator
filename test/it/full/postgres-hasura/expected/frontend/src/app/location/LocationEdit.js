import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { updateLocation, useLocationEdit } from './location-api'

export default () =>
  <EditScreen
    title="Edit location"
    entityTitle="Location"
    url="/locations"
    useResourceEdit={useLocationEdit}
    rows={1}
    validationSchema={
      Yup.object({
        name: Yup.string()
      })
    }
    update={data => updateLocation(data.id, data.version, data)}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} autoFocus/>

  </EditScreen>
