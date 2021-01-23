import React, { useState } from 'react'
import { useMountedState } from 'react-use'
import SavingButtonBase from './SavingButtonBase'

export default ({ onClick, children, ...rest }) => {
  const [saving, setSaving] = useState(false)
  const isMounted = useMountedState()

  const handleClick = async (...args) => {
    setSaving(true)
    await onClick(...args)
    if (isMounted()) {
      setSaving(false)
    }
  }

  return <>
    <SavingButtonBase onClick={handleClick}
                      saving={saving}
                      {...rest}>
      {children}
    </SavingButtonBase>
  </>
}
