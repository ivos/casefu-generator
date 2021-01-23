import React from 'react'
import { DetailScreen, EditButton, NavigationButton, StaticGroup } from '../../shared'
import { useLocation } from './location-api'

export default () =>
  <DetailScreen
    title="Location detail"
    entityTitle="Location"
    rows={2}
    useResourceGet={useLocation}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <NavigationButton label="Location events" className="mr-3"
                            to={`/events?locationId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
      </>
    }
  </DetailScreen>
