import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { masterALabel, MasterASelect } from '../master-a/MasterASelects'
import { masterBLabel, MasterBSelect } from '../master-b/MasterBSelects'
import { detailBFromApi, detailBToApi, useDetailBs } from './detail-b-api'

let searchValuesCache = {
  id: '',
  name: '',
  masterA1: '',
  masterA2: '',
  masterB1: '',
  masterB2: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Detail bs
        <CreateButton to="/detail-bs/new" title="Create new detail b..."
                      initialValues={detailBToApi(searchValuesCache)}/>
      </>
    }
    url="/detail-bs"
    useResourceList={useDetailBs}
    toApi={detailBToApi}
    fromApi={detailBFromApi}
    searchFormRows={6}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterASelect} name="masterA1" label="Master a1" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterASelect} name="masterA2" label="Master a2" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterBSelect} name="masterB1" label="Master b1" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterBSelect} name="masterB2" label="Master b2" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={6}
    tableHeader={
      <>
        <th>Id</th>
        <th>Name</th>
        <th>Master a1</th>
        <th>Master a2</th>
        <th>Master b1</th>
        <th>Master b2</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{masterALabel(item.masterA1)}</td>
        <td>{masterALabel(item.masterA2)}</td>
        <td>{masterBLabel(item.masterB1)}</td>
        <td>{masterBLabel(item.masterB2)}</td>
      </>
    }
  />
