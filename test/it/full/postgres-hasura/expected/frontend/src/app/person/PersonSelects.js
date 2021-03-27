import React from 'react'
import { sentenceCase } from 'change-case'
import { AsyncSelect } from '../../shared'
import { listPeople, usePerson } from './person-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const personLabel = data => data && entityLabel(', ',
  data.personalNumber,
  data.familyName,
  data.givenNames,
  data.userName,
  data.email,
  sentenceCase(data.sex || ''))

export const PersonSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listPeople({ personalNumber: query })}
               getOptionValue={option => option.id}
               getOptionLabel={personLabel}
               restoredValue={useRestored(name + 'Id', usePerson)}
               name={name}
               {...rest}/>
