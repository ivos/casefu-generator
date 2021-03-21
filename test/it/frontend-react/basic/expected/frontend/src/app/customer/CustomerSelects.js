import React from 'react'
import { sentenceCase } from 'change-case'
import { countryLabel } from '../country/CountrySelects'
import { AsyncSelect } from '../../shared'
import { listCustomers, useCustomer } from './customer-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const customerLabel = data => data && entityLabel(', ',
  data.name,
  countryLabel(data.country),
  sentenceCase(data.status || ''))

export const CustomerSelect = props =>
  <AsyncSelect searchFn={query => listCustomers({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={customerLabel}
               {...props}/>

export const CustomerSearchSelect = ({ name, ...rest }) =>
  <CustomerSelect
    restoredValue={useRestored(name + 'Id', useCustomer)}
    name={name}
    {...rest}/>
