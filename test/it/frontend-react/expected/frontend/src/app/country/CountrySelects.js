import React from 'react'
import { AsyncSelect } from '../../shared'
import { listCountries, useCountry } from './country-api'
import { useRestored } from '../../shared/utils'

export const CountrySelect = props =>
  <AsyncSelect searchFn={query => listCountries({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...props}/>

export const CountrySearchSelect = ({ name, ...rest }) =>
  <CountrySelect
    restoredValue={useRestored(name + 'Code', useCountry)}
    name={name}
    {...rest}/>
