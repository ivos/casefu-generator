import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { HierarchySelect } from '../hierarchy/HierarchySelects'
import { updateHierarchy, useHierarchyEdit } from './hierarchy-api'

export default () =>
  <EditScreen
    title="Edit hierarchy"
    entityTitle="Hierarchy"
    url="/hierarchies"
    useResourceEdit={useHierarchyEdit}
    rows={2}
    validationSchema={
      Yup.object({
        parent: Yup.object().nullable(),
        name: Yup.string()
          .required()
      })
    }
    update={data => updateHierarchy(data.id, data.version, data)}>

    <FieldGroup as={HierarchySelect} name="parent" label="Parent" sm={[2, 9]} autoFocus/>
    <FieldGroup as={Form.Control} name="name" label="Name" sm={[2, 9]} required/>

  </EditScreen>
