import React from 'react'
import { AsyncSelect } from '../../shared'
import { listLocations, useLocation } from './location-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const locationLabel = data => data && entityLabel(', ',
  data.name)

export const LocationSelect = props =>
  <AsyncSelect searchFn={query => listLocations({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={locationLabel}
               {...props}/>

export const LocationSearchSelect = ({ name, ...rest }) =>
  <LocationSelect
    restoredValue={useRestored(name + 'Id', useLocation)}
    name={name}
    {...rest}/>
