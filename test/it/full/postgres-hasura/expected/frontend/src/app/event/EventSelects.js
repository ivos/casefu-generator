import React from 'react'
import { AsyncSelect } from '../../shared'
import { listEvents, useEvent } from './event-api'
import { useRestored } from '../../shared/utils'

export const EventSelect = props =>
  <AsyncSelect searchFn={query => listEvents({ time: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.time}
               {...props}/>

export const EventSearchSelect = ({ name, ...rest }) =>
  <EventSelect
    restoredValue={useRestored(name + 'Id', useEvent)}
    name={name}
    {...rest}/>
