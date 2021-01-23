import React, { useEffect } from 'react'
import { Field, useFormikContext } from 'formik'
import { useFormField } from '../utils'

export default ({ name, ...rest }) => {
  const { isValid, isInvalid, changedValue, serverError } = useFormField(name)
  const { status, setStatus } = useFormikContext()

  useEffect(() => {
    if (changedValue) {
      if (!status.changed[name]) {
        setStatus({ ...status, changed: { ...status.changed, [name]: true } })
      }
      if (serverError) {
        const copy = { ...status.serverErrors }
        delete copy[name]
        setStatus({ ...status, serverErrors: copy })
      }
    }
  })

  return <>
    <Field name={name}
           isValid={isValid}
           isInvalid={isInvalid}
           {...rest}/>
  </>
}
