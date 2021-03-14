import React from 'react'
import { AsyncSelect } from '../../shared'
import { listPeople, usePerson } from './person-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const personLabel = data => data && entityLabel(', ', data.personalNumber)

export const PersonSelect = props =>
  <AsyncSelect searchFn={query => listPeople({ personalNumber: query })}
               getOptionValue={option => option.id}
               getOptionLabel={personLabel}
               {...props}/>

export const PersonSearchSelect = ({ name, ...rest }) =>
  <PersonSelect
    restoredValue={useRestored(name + 'Id', usePerson)}
    name={name}
    {...rest}/>
