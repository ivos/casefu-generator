import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { masterBFromApi, masterBToApi, useMasterBs } from './master-b-api'

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
        Master bs
        <CreateButton to="/master-bs/new" title="Create new master b..."
                      initialValues={masterBToApi(searchValuesCache)}/>
      </>
    }
    url="/master-bs"
    useResourceList={useMasterBs}
    toApi={masterBToApi}
    fromApi={masterBFromApi}
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
