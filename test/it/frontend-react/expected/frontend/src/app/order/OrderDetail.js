import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, SavingButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
import { patchOrder, useOrder } from './order-api'
import { formatDate, formatDateTime } from '../../i18n'

const patch = (data, patch, wrapAction) => async () => {
  await wrapAction(() => patchOrder(data.id, data.version, patch))
}

export default () =>
  <DetailScreen
    title="Order detail"
    entityTitle="Order"
    rows={7}
    useResourceGet={useOrder}
    buttons={
      (data, { isValidating, isChanging, wrapAction }) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || ['created'].includes(data.status)}
                        onClick={patch(data, { status: 'created' }, wrapAction)}>
            Created
          </SavingButton>
          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || ['submitted'].includes(data.status)}
                        onClick={patch(data, { status: 'submitted' }, wrapAction)}>
            Submitted
          </SavingButton>
          <SavingButton variant="warning" className="mr-3"
                        disabled={isChanging || isValidating || ['delivered'].includes(data.status)}
                        onClick={patch(data, { status: 'delivered' }, wrapAction)}>
            Delivered
          </SavingButton>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Order number" sm={[2, 10]} value={data.orderNumber}/>
        <StaticGroup label="Customer" sm={[2, 10]}>
          <Link to={`/customers/${data.customer?.id}`}>
            {data.customer?.name}
          </Link>
        </StaticGroup>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status)}/>
        <StaticGroup label="Received" sm={[2, 10]} value={formatDateTime(data.received)}/>
        <StaticGroup label="Delivery date" sm={[2, 10]} value={formatDate(data.deliveryDate)}/>
        <StaticGroup label="Note" sm={[2, 10]} value={data.note}/>
      </>
    }
  </DetailScreen>
