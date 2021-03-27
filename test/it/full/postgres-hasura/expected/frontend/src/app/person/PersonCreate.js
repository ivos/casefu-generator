import React from 'react'
import { Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { CreateScreen, FieldGroup } from '../../shared'
import PersonSexSelect from './PersonSexSelect'
import { createPerson, personFromApi } from './person-api'

export default () =>
  <CreateScreen
    title="Create person"
    entityTitle="Person"
    url="/people"
    rows={6}
    fromApi={personFromApi}
    initialValues={{
      personalNumber: '',
      familyName: '',
      givenNames: '',
      userName: '',
      email: '',
      sex: ''
    }}
    validationSchema={
      Yup.object({
        personalNumber: Yup.string()
          .required(),
        familyName: Yup.string()
          .required(),
        givenNames: Yup.string(),
        userName: Yup.string()
          .required(),
        email: Yup.string(),
        sex: Yup.string()
      })
    }
    create={createPerson}>

    <FieldGroup as={Form.Control} name="personalNumber" label="Personal number" sm={[2, 9]} required autoFocus/>
    <FieldGroup as={Form.Control} name="familyName" label="Family name" sm={[2, 9]} required/>
    <FieldGroup as={Form.Control} name="givenNames" label="Given names" sm={[2, 9]}/>
    <FieldGroup as={Form.Control} name="userName" label="User name" sm={[2, 9]} required/>
    <FieldGroup as={Form.Control} name="email" label="Email" sm={[2, 9]}/>
    <FieldGroup as={PersonSexSelect} name="sex" label="Sex" sm={[2, 9]}/>

  </CreateScreen>
