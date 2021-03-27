import React from 'react'
import { AsyncSelect } from '../../shared'
import { listCountries, useCountry } from './country-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const countryLabel = data => data && entityLabel(', ',
  data.name)

export const CountrySelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listCountries({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={countryLabel}
               restoredValue={useRestored(name + 'Code', useCountry)}
               name={name}
               {...rest}/>
