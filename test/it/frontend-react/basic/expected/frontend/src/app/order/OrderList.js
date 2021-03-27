import React from 'react'
import { Form } from 'react-bootstrap'
import { sentenceCase } from 'change-case'
import { CreateButton, DateRangePicker, DateTimeRangePicker, FieldGroup, ListScreen } from '../../shared'
import { customerLabel, CustomerSelect } from '../customer/CustomerSelects'
import OrderStatusSelect from './OrderStatusSelect'
import { orderFromApi, orderToApi, useOrders } from './order-api'
import { formatDate, formatDateTime } from '../../i18n'

let searchValuesCache = {
  id: '',
  orderNumber: '',
  customer: '',
  status: '',
  receivedFrom: '',
  receivedTo: '',
  deliveryDateFrom: '',
  deliveryDateTo: '',
  note: ''
}

export default () =>
  <ListScreen
    searchValuesCache={searchValuesCache}
    setSearchValuesCache={values => searchValuesCache = values}
    title={
      <>
        Orders
        <CreateButton to="/orders/new" title="Create new order..."
                      initialValues={orderToApi(searchValuesCache)}/>
      </>
    }
    url="/orders"
    useResourceList={useOrders}
    toApi={orderToApi}
    fromApi={orderFromApi}
    searchFormRows={7}
    searchFormContent={
      <>
        <FieldGroup as={Form.Control} name="id" label="Id" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="orderNumber" label="Order number" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={CustomerSelect} name="customer" label="Customer" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={OrderStatusSelect} name="status" label="Status" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={DateTimeRangePicker} name="received" label="Received" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={DateRangePicker} name="deliveryDate" label="Delivery date" sm={[2, 9]} isValid={false}/>
        <FieldGroup as={Form.Control} name="note" label="Note" sm={[2, 9]} isValid={false}/>
      </>
    }
    columns={7}
    tableHeader={
      <>
        <th>Id</th>
        <th>Order number</th>
        <th>Customer</th>
        <th>Status</th>
        <th>Received</th>
        <th>Delivery date</th>
        <th>Note</th>
      </>
    }
    tablePageContent={
      item => <>
        <td>{item.id}</td>
        <td>{item.orderNumber}</td>
        <td>{customerLabel(item.customer)}</td>
        <td>{sentenceCase(item.status || '')}</td>
        <td>{formatDateTime(item.received)}</td>
        <td>{formatDate(item.deliveryDate)}</td>
        <td>{item.note}</td>
      </>
    }
  />
