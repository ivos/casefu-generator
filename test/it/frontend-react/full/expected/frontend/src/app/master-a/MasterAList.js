import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { masterAFromApi, masterAToApi, useMasterAs } from './master-a-api'

let searchValuesCache = {
  id: '',
  code: '',
  name: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Master as
        <CreateButton to="/master-as/new" title="Create new master a..."/>
      </>
    }
    url="/master-as"
    useResourceList={useMasterAs}
    toApi={masterAToApi}
    fromApi={masterAFromApi}
    searchFormRows={3}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={3}
    tableHeader={
      <>
        <th>Id</th>
        <th>Code</th>
        <th>Name</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.code}</td>
        <td>{item.name}</td>
      </>
    }
  />
