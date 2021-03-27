import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { locationFromApi, locationToApi, useLocations } from './location-api'

let searchValuesCache = {
  id: '',
  name: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Locations
        <CreateButton to="/locations/new" title="Create new location..."
                      initialValues={locationToApi(searchValuesCache)}/>
      </>
    }
    url="/locations"
    useResourceList={useLocations}
    toApi={locationToApi}
    fromApi={locationFromApi}
    searchFormRows={2}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={2}
    tableHeader={
      <>
        <th>Id</th>
        <th>Name</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.name}</td>
      </>
    }
  />
