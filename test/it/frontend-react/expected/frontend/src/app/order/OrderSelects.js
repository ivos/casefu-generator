import React from 'react'
import { AsyncSelect } from '../../shared'
import { listOrders, useOrder } from './order-api'
import { useRestored } from '../../shared/utils'

export const OrderSelect = props =>
  <AsyncSelect searchFn={query => listOrders({ orderNumber: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.orderNumber}
               {...props}/>

export const OrderSearchSelect = ({ name, ...rest }) =>
  <OrderSelect
    restoredValue={useRestored(name + 'Id', useOrder)}
    name={name}
    {...rest}/>
