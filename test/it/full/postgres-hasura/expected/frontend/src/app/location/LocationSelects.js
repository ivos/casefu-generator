import React from 'react'
import { AsyncSelect } from '../../shared'
import { listLocations, useLocation } from './location-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const locationLabel = data => data && entityLabel(', ',
  data.name)

export const LocationSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listLocations({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={locationLabel}
               restoredValue={useRestored(name + 'Id', useLocation)}
               name={name}
               {...rest}/>
