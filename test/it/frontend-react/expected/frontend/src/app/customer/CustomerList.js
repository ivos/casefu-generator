import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { CountrySearchSelect } from '../country/CountrySelects'
import CustomerStatusSelect from './CustomerStatusSelect'
import { customerFromApi, customerToApi, useCustomers } from './customer-api'

let searchValuesCache = {
  id: '',
  name: '',
  country: '',
  status: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Customers
        <CreateButton to="/customers/new" title="Create new customer..."/>
      </>
    }
    url="/customers"
    useResourceList={useCustomers}
    toApi={customerToApi}
    fromApi={customerFromApi}
    searchFormRows={4}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={CountrySearchSelect} name="country" label="Country" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={CustomerStatusSelect} name="status" label="Status" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={4}
    tableHeader={
      <>
        <th>Id</th>
        <th>Name</th>
        <th>Country</th>
        <th>Status</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.country?.name}</td>
        <td>{sentenceCase(item.status || '')}</td>
      </>
    }
  />
