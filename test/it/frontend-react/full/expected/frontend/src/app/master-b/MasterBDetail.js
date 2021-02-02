import React from 'react'
import { DetailScreen, EditButton, NavigationButton, StaticGroup } from '../../shared'
import { useMasterB } from './master-b-api'

export default () =>
  <DetailScreen
    title="Master b detail"
    entityTitle="Master b"
    rows={2}
    useResourceGet={useMasterB}
    buttons={
      (data) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <NavigationButton label="Master b1 detail bs" className="mr-3"
                            to={`/detail-bs?masterB1Id=${data.id}`}/>
          <NavigationButton label="Master b2 detail bs" className="mr-3"
                            to={`/detail-bs?masterB2Id=${data.id}`}/>
          <NavigationButton label="Master second link abs" className="mr-3"
                            to={`/link-abs?masterSecondId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
      </>
    }
  </DetailScreen>
