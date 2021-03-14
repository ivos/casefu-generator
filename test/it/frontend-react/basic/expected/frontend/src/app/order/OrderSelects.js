import React from 'react'
import { AsyncSelect } from '../../shared'
import { listOrders, useOrder } from './order-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const orderLabel = data => data && entityLabel(', ', data.orderNumber)

export const OrderSelect = props =>
  <AsyncSelect searchFn={query => listOrders({ orderNumber: query })}
               getOptionValue={option => option.id}
               getOptionLabel={orderLabel}
               {...props}/>

export const OrderSearchSelect = ({ name, ...rest }) =>
  <OrderSelect
    restoredValue={useRestored(name + 'Id', useOrder)}
    name={name}
    {...rest}/>
