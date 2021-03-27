import React from 'react'
import { sentenceCase } from 'change-case'
import { locationLabel } from '../location/LocationSelects'
import { AsyncSelect } from '../../shared'
import { listEvents, useEvent } from './event-api'
import { entityLabel, useRestored } from '../../shared/utils'
import { formatDateTime } from '../../i18n'

export const eventLabel = data => data && entityLabel(', ',
  formatDateTime(data.time),
  sentenceCase(data.status || ''),
  locationLabel(data.location))

export const EventSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listEvents({ time: query })}
               getOptionValue={option => option.id}
               getOptionLabel={eventLabel}
               restoredValue={useRestored(name + 'Id', useEvent)}
               name={name}
               {...rest}/>
