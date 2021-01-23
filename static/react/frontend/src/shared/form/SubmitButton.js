import React from 'react'
import { useFormikContext } from 'formik'
import SavingButtonBase from './SavingButtonBase'

export default ({ children, ...rest }) => {
  const { isSubmitting } = useFormikContext()

  return <>
    <SavingButtonBase type="submit"
                      saving={isSubmitting}
                      {...rest}>
      {children}
    </SavingButtonBase>
  </>
}
