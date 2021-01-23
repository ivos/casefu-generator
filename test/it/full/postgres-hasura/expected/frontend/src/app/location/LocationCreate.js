import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { createLocation } from './location-api'

export default () =>
  <CreateScreen
    title="Create location"
    entityTitle="Location"
    url="/locations"
    rows={1}
    initialValues={{
      name: ''
    }}
    validationSchema={
      Yup.object({
        name: Yup.string()
      })
    }
    create={createLocation}>

    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} autoFocus/>

  </CreateScreen>
