import React from 'react'
import { AsyncSelect } from '../../shared'
import { listEvents, useEvent } from './event-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const eventLabel = data => data && entityLabel(', ', data.time)

export const EventSelect = props =>
  <AsyncSelect searchFn={query => listEvents({ time: query })}
               getOptionValue={option => option.id}
               getOptionLabel={eventLabel}
               {...props}/>

export const EventSearchSelect = ({ name, ...rest }) =>
  <EventSelect
    restoredValue={useRestored(name + 'Id', useEvent)}
    name={name}
    {...rest}/>
