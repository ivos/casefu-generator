import React from 'react'
import { AutoSubmit, FormikForm } from '..'

export default ({ searchValues, setSearchValues, resetPages, children }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                resetPages()
                setSearchValues(values)
              }}>
    {children}

    <AutoSubmit/>
  </FormikForm>
