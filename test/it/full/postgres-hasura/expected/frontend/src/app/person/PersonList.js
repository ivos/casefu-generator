import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import PersonSexSelect from './PersonSexSelect'
import { personFromApi, personToApi, usePeople } from './person-api'

let searchValuesCache = {
  id: '',
  personalNumber: '',
  familyName: '',
  givenNames: '',
  userName: '',
  email: '',
  sex: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        People
        <CreateButton to="/people/new" title="Create new person..."/>
      </>
    }
    url="/people"
    useResourceList={usePeople}
    toApi={personToApi}
    fromApi={personFromApi}
    searchFormRows={7}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="personalNumber" label="Personal number" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="familyName" label="Family name" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="givenNames" label="Given names" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="userName" label="User name" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="email" label="Email" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={PersonSexSelect} name="sex" label="Sex" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={7}
    tableHeader={
      <>
        <th>Id</th>
        <th>Personal number</th>
        <th>Family name</th>
        <th>Given names</th>
        <th>User name</th>
        <th>Email</th>
        <th>Sex</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.personalNumber}</td>
        <td>{item.familyName}</td>
        <td>{item.givenNames}</td>
        <td>{item.userName}</td>
        <td>{item.email}</td>
        <td>{sentenceCase(item.sex)}</td>
      </>
    }
  />
