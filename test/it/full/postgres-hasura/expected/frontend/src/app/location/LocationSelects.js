import React from 'react'
import { AsyncSelect } from '../../shared'
import { listLocations, useLocation } from './location-api'
import { useRestored } from '../../shared/utils'

export const LocationSelect = props =>
  <AsyncSelect searchFn={query => listLocations({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...props}/>

export const LocationSearchSelect = ({ name, ...rest }) =>
  <LocationSelect
    restoredValue={useRestored(name + 'Id', useLocation)}
    name={name}
    {...rest}/>
