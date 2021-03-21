import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { masterALabel, MasterASearchSelect } from '../master-a/MasterASelects'
import { detailAFromApi, detailAToApi, useDetailAs } from './detail-a-api'

let searchValuesCache = {
  id: '',
  code: '',
  name: '',
  master: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Detail as
        <CreateButton to="/detail-as/new" title="Create new detail a..."/>
      </>
    }
    url="/detail-as"
    useResourceList={useDetailAs}
    toApi={detailAToApi}
    fromApi={detailAFromApi}
    searchFormRows={4}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="code" label="Code" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterASearchSelect} name="master" label="Master" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={4}
    tableHeader={
      <>
        <th>Id</th>
        <th>Code</th>
        <th>Name</th>
        <th>Master</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.code}</td>
        <td>{item.name}</td>
        <td>{masterALabel(item.master)}</td>
      </>
    }
  />
