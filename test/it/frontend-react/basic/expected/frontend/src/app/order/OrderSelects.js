import React from 'react'
import { sentenceCase } from 'change-case'
import { customerLabel } from '../customer/CustomerSelects'
import { AsyncSelect } from '../../shared'
import { listOrders, useOrder } from './order-api'
import { entityLabel, useRestored } from '../../shared/utils'
import { formatDate, formatDateTime } from '../../i18n'

export const orderLabel = data => data && entityLabel(', ',
  data.orderNumber,
  customerLabel(data.customer),
  sentenceCase(data.status || ''),
  formatDateTime(data.received),
  formatDate(data.deliveryDate),
  data.note)

export const OrderSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listOrders({ orderNumber: query })}
               getOptionValue={option => option.id}
               getOptionLabel={orderLabel}
               restoredValue={useRestored(name + 'Id', useOrder)}
               name={name}
               {...rest}/>
