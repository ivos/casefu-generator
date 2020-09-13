import React from 'react'
import { AutoSubmit, FormikForm } from '..'

export default ({ searchValues, setSearchValues, setSearchValuesCache, resetPages, children }) =>
  <FormikForm initialValues={searchValues}
              onSubmit={values => {
                resetPages()
                setSearchValues(values)
                setSearchValuesCache && setSearchValuesCache(values)
              }}>
    {children}

    <AutoSubmit/>
  </FormikForm>
