import React from 'react'
import { AsyncSelect } from '../../shared'
import { listCountries, useCountry } from './country-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const countryLabel = data => data && entityLabel(', ', data.name)

export const CountrySelect = props =>
  <AsyncSelect searchFn={query => listCountries({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={countryLabel}
               {...props}/>

export const CountrySearchSelect = ({ name, ...rest }) =>
  <CountrySelect
    restoredValue={useRestored(name + 'Code', useCountry)}
    name={name}
    {...rest}/>
