import React from 'react'
import { AsyncSelect } from '../../shared'
import { listCustomers, useCustomer } from './customer-api'
import { useRestored } from '../../shared/utils'

export const CustomerSelect = props =>
  <AsyncSelect searchFn={query => listCustomers({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...props}/>

export const CustomerSearchSelect = ({ name, ...rest }) =>
  <CustomerSelect
    restoredValue={useRestored(name + 'Id', useCustomer)}
    name={name}
    {...rest}/>
