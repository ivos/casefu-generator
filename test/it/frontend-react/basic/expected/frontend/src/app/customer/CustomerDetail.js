import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, NavigationButton, SavingButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
import { patchCustomer, useCustomer } from './customer-api'

const patch = (data, patch, wrapAction) => async () => {
  await wrapAction(() => patchCustomer(data.id, data.version, patch))
}

export default () =>
  <DetailScreen
    title="Customer detail"
    entityTitle="Customer"
    rows={4}
    useResourceGet={useCustomer}
    buttons={
      (data, { isValidating, isChanging, wrapAction }) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <SavingButton variant="warning" className="mr-1"
                        disabled={isChanging || isValidating || ['active'].includes(data.status)}
                        onClick={patch(data, { status: 'active' }, wrapAction)}>
            Active
          </SavingButton>
          <SavingButton variant="warning" className="mr-3"
                        disabled={isChanging || isValidating || ['disabled'].includes(data.status)}
                        onClick={patch(data, { status: 'disabled' }, wrapAction)}>
            Disabled
          </SavingButton>

          <NavigationButton label="Customer orders" className="mr-3"
                            to={`/orders?customerId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
        <StaticGroup label="Country" sm={[2, 10]}>
          <Link to={`/countries/${data.country?.id}`}>
            {data.country?.name}
          </Link>
        </StaticGroup>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status || '')}/>
      </>
    }
  </DetailScreen>
