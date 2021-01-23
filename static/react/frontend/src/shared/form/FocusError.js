import { useEffect } from 'react'
import { useFormikContext } from 'formik'
import { usePrevious } from 'react-use'

export default () => {
  const { errors, status, isValid, isSubmitting } = useFormikContext()
  const prevSubmitting = usePrevious(isSubmitting)

  useEffect(() => {
    const errorFieldNames = Object.keys(errors)
    const serverErrorFieldNames = Object.keys(status.serverErrors)

    if ((prevSubmitting && !isSubmitting && !isValid && errorFieldNames.length > 0) ||
      (isSubmitting && serverErrorFieldNames.length > 0)) {
      const firstErrorName = [...errorFieldNames, ...serverErrorFieldNames][0]
      const selector = `[name="${firstErrorName}"], #field-${firstErrorName}`
      const errorElement = document.querySelector(selector)
      if (errorElement && errorElement.focus) {
        errorElement.focus()
      }
    }
  }, [prevSubmitting, isSubmitting, isValid, status, errors])

  return null
}
