import { useState } from 'react'
import { useFormikContext } from 'formik'
import { useDebounce } from 'react-use'
import isDeepEqual from 'react-fast-compare'
import { typingDebounceDelay } from '../../constants'

export default () => {
  const { values, submitForm } = useFormikContext()
  const [prevValues, setPrevValues] = useState()

  useDebounce(async () => {
      if (!isDeepEqual(values, prevValues)) {
        setPrevValues(values)
        if (prevValues !== undefined) {
          await submitForm()
        }
      }
    },
    typingDebounceDelay,
    [values])

  return null
}
