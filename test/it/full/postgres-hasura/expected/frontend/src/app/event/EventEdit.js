import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { DateTimePicker, EditScreen, FieldGroup } from '../../shared'
import { LocationSelect } from '../location/LocationSelects'
import EventStatusSelect from './EventStatusSelect'
import { updateEvent, useEventEdit } from './event-api'

export default () =>
  <EditScreen
    title="Edit event"
    entityTitle="Event"
    url="/events"
    useResourceEdit={useEventEdit}
    rows={3}
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
    update={data => updateEvent(data.id, data.version, data)}>

    <FieldGroup as={DateTimePicker} name="time" label="Time" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={EventStatusSelect} name="status" label="Status" sm={[2, 9]} required/>
    <FieldGroup as={LocationSelect} name="location" label="Location" sm={[2, 9]} required/>

  </EditScreen>
