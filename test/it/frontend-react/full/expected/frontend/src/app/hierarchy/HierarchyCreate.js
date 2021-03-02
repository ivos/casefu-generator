import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import { HierarchySelect } from '../hierarchy/HierarchySelects'
import { createHierarchy } from './hierarchy-api'

export default () =>
  <CreateScreen
    title="Create hierarchy"
    entityTitle="Hierarchy"
    url="/hierarchies"
    rows={2}
    initialValues={{
      parent: '',
      name: ''
    }}
    validationSchema={
      Yup.object({
        parent: Yup.object().nullable(),
        name: Yup.string()
          .required()
      })
    }
    create={createHierarchy}>

    <FieldGroup as={HierarchySelect} name="parent" label="Parent" sm={[2, 9]} autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>

  </CreateScreen>
