import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { EditScreen, FieldGroup } from '../../shared'
import { MasterASelect } from '../master-a/MasterASelects'
import { MasterBSelect } from '../master-b/MasterBSelects'
import { updateLinkAB, useLinkABEdit } from './link-ab-api'

export default () =>
  <EditScreen
    title="Edit link ab"
    entityTitle="Link ab"
    url="/link-abs"
    useResourceEdit={useLinkABEdit}
    rows={2}
    validationSchema={
      Yup.object({
        masterFirst: Yup.object().nullable()
          .required(),
        masterSecond: Yup.object().nullable()
          .required()
      })
    }
    update={data => updateLinkAB(data.id, data.version, data)}>

    <FieldGroup as={MasterASelect} name="masterFirst" label="Master first" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={MasterBSelect} name="masterSecond" label="Master second" sm={[2, 9]} required/>

  </EditScreen>
