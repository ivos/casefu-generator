import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SubmitButton } from '.'

export default () =>
  <SubmitButton>
    <FontAwesomeIcon icon="check"/>
    &nbsp;Save
  </SubmitButton>
