import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { MasterASearchSelect } from '../master-a/MasterASelects'
import { MasterBSearchSelect } from '../master-b/MasterBSelects'
import { linkAbFromApi, linkAbToApi, useLinkAbs } from './link-ab-api'

let searchValuesCache = {
  id: '',
  masterFirst: '',
  masterSecond: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Link abs
        <CreateButton to="/link-abs/new" title="Create new link ab..."/>
      </>
    }
    url="/link-abs"
    useResourceList={useLinkAbs}
    toApi={linkAbToApi}
    fromApi={linkAbFromApi}
    searchFormRows={3}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterASearchSelect} name="masterFirst" label="Master first" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={MasterBSearchSelect} name="masterSecond" label="Master second" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={3}
    tableHeader={
      <>
        <th>Id</th>
        <th>Master first</th>
        <th>Master second</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.masterFirst?.code}</td>
        <td>{item.masterSecond?.name}</td>
      </>
    }
  />
