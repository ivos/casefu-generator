import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, DateTimeRangePicker, FieldGroup, ListScreen } from '../../shared'
import { locationLabel, LocationSelect } from '../location/LocationSelects'
import EventStatusSelect from './EventStatusSelect'
import { eventFromApi, eventToApi, useEvents } from './event-api'
import { formatDateTime } from '../../i18n'

let searchValuesCache = {
  id: '',
  timeFrom: '',
  timeTo: '',
  status: '',
  location: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Events
        <CreateButton to="/events/new" title="Create new event..."
                      initialValues={eventToApi(searchValuesCache)}/>
      </>
    }
    url="/events"
    useResourceList={useEvents}
    toApi={eventToApi}
    fromApi={eventFromApi}
    searchFormRows={4}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={DateTimeRangePicker} name="time" label="Time" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={EventStatusSelect} name="status" label="Status" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={LocationSelect} name="location" label="Location" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={4}
    tableHeader={
      <>
        <th>Id</th>
        <th>Time</th>
        <th>Status</th>
        <th>Location</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{formatDateTime(item.time)}</td>
        <td>{sentenceCase(item.status || '')}</td>
        <td>{locationLabel(item.location)}</td>
      </>
    }
  />
