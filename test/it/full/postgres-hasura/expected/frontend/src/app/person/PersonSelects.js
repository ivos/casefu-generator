import React from 'react'
import { AsyncSelect } from '../../shared'
import { listPeople, usePerson } from './person-api'
import { useRestored } from '../../shared/utils'

export const PersonSelect = props =>
  <AsyncSelect searchFn={query => listPeople({ personalNumber: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.personalNumber}
               {...props}/>

export const PersonSearchSelect = ({ name, ...rest }) =>
  <PersonSelect
    restoredValue={useRestored(name + 'Id', usePerson)}
    name={name}
    {...rest}/>
