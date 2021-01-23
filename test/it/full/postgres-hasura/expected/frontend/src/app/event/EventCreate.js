import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, DateTimePicker, FieldGroup } from '../../shared'
import { LocationSelect } from '../location/LocationSelects'
import { createEvent } from './event-api'

export default () =>
  <CreateScreen
    title="Create event"
    entityTitle="Event"
    url="/events"
    rows={3}
    initialValues={{
      time: '',
      status: '',
      location: ''
    }}
    validationSchema={
      Yup.object({
        time: Yup.date().nullable()
          .required(),
        status: Yup.string()
          .required(),
        location: Yup.object().nullable()
          .required()
      })
    }
    create={createEvent}>

    <FieldGroup as={DateTimePicker} name="time" label="Time" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={EventStatusSelect} name="status" label="Status" sm={[2, 9]} required/>
    <FieldGroup as={LocationSelect} name="location" label="Location" sm={[2, 9]} required/>

  </CreateScreen>
