import React from 'react'
import { Form } from 'react-bootstrap'
import { CreateButton, FieldGroup, ListScreen } from '../../shared'
import { hierarchyLabel, HierarchySelect } from '../hierarchy/HierarchySelects'
import { hierarchyFromApi, hierarchyToApi, useHierarchies } from './hierarchy-api'

let searchValuesCache = {
  id: '',
  parent: '',
  name: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Hierarchies
        <CreateButton to="/hierarchies/new" title="Create new hierarchy..."
                      initialValues={hierarchyToApi(searchValuesCache)}/>
      </>
    }
    url="/hierarchies"
    useResourceList={useHierarchies}
    toApi={hierarchyToApi}
    fromApi={hierarchyFromApi}
    searchFormRows={3}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={HierarchySelect} name="parent" label="Parent" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={3}
    tableHeader={
      <>
        <th>Id</th>
        <th>Parent</th>
        <th>Name</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{hierarchyLabel(item.parent)}</td>
        <td>{item.name}</td>
      </>
    }
  />
