import React from 'react'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import { FocusError } from '.'
import { isValidationError } from '../../api'
import { emptyValuesToNulls, nullValuesToEmpty } from '../utils'

const mapServerErrorCodesToLabels = (mapServerErrorCodeToLabel, serverErrors) => {
  return Object.fromEntries(
    serverErrors
      .map(({ path, errorCode }) => [path, mapServerErrorCodeToLabel(path, errorCode)])
  )
}

const wrapSubmit = (onSubmit, mapServerErrorCodeToLabel) => async (values, formikBag) => {
  formikBag.setStatus({ changed: {}, serverErrors: {} })
  try {
    return await onSubmit(emptyValuesToNulls(values), formikBag)
  } catch (error) {
    if (isValidationError(error)) {
      const { errors: serverErrors } = error.response.data
      const errors = mapServerErrorCodeToLabel ?
        mapServerErrorCodesToLabels(mapServerErrorCodeToLabel, serverErrors) : serverErrors
      formikBag.setStatus({ changed: {}, serverErrors: errors })
      return
    }
    throw error
  }
}

export default ({ initialValues, onSubmit, mapServerErrorCodeToLabel, children, ...rest }) =>
  <Formik initialValues={nullValuesToEmpty(initialValues)}
          enableReinitialize={true}
          initialStatus={{ changed: {}, serverErrors: {} }}
          onSubmit={wrapSubmit(onSubmit, mapServerErrorCodeToLabel)}
          {...rest}
  >
    {
      (props) => {
        const resolvedChildren = (typeof children === 'function') ? children(props) : children

        return (
          <Form noValidate onSubmit={props.handleSubmit}>
            {resolvedChildren}

            <FocusError/>
          </Form>
        )
      }
    }
  </Formik>
