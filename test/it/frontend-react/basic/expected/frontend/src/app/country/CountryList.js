import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { countryFromApi, countryToApi, useCountries } from './country-api'

let searchValuesCache = {
  code: '',
  name: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Countries
        <CreateButton to="/countries/new" title="Create new country..."
                      initialValues={countryToApi(searchValuesCache)}/>
      </>
    }
    url="/countries"
    useResourceList={useCountries}
    toApi={countryToApi}
    fromApi={countryFromApi}
    searchFormRows={2}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={2}
    tableHeader={
      <>
        <th>Code</th>
        <th>Name</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.code}</td>
        <td>{item.name}</td>
      </>
    }
  />
