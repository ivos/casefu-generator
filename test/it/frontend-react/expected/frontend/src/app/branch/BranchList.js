import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import BranchTypeSelect from './BranchTypeSelect'
import { branchFromApi, branchToApi, useBranches } from './branch-api'

let searchValuesCache = {
  id: '',
  street: '',
  city: '',
  zipCode: '',
  type: '',
  note: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Branches
        <CreateButton to="/branches/new" title="Create new branch..."/>
      </>
    }
    url="/branches"
    useResourceList={useBranches}
    toApi={branchToApi}
    fromApi={branchFromApi}
    searchFormRows={6}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="street" label="Street" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="city" label="City" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="zipCode" label="Zip code" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={BranchTypeSelect} name="type" label="Type" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={6}
    tableHeader={
      <>
        <th>Id</th>
        <th>Street</th>
        <th>City</th>
        <th>Zip code</th>
        <th>Type</th>
        <th>Note</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.street}</td>
        <td>{item.city}</td>
        <td>{item.zipCode}</td>
        <td>{sentenceCase(item.type || '')}</td>
        <td>{item.note}</td>
      </>
    }
  />
