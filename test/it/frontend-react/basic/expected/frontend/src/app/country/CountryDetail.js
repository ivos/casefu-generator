import React from 'react'
import { DetailScreen, EditButton, NavigationButton, StaticGroup } from '../../shared'
import { useCountry } from './country-api'

export default () =>
  <DetailScreen
    title="Country detail"
    entityTitle="Country"
    rows={2}
    useResourceGet={useCountry}
    buttons={
      (data) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <NavigationButton label="Country customers" className="mr-3"
                            to={`/customers?countryId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Code" sm={[2, 10]} value={data.code}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
      </>
    }
  </DetailScreen>
