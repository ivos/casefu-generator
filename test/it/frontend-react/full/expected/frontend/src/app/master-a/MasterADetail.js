import React from 'react'
import { DetailScreen, EditButton, NavigationButton, StaticGroup } from '../../shared'
import { useMasterA } from './master-a-api'

export default () =>
  <DetailScreen
    title="Master a detail"
    entityTitle="Master a"
    rows={3}
    useResourceGet={useMasterA}
    buttons={
      (data) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <NavigationButton label="Master detail as" className="mr-3"
                            to={`/detail-as?masterId=${data.id}`}/>
          <NavigationButton label="Master a1 detail bs" className="mr-3"
                            to={`/detail-bs?masterA1Id=${data.id}`}/>
          <NavigationButton label="Master a2 detail bs" className="mr-3"
                            to={`/detail-bs?masterA2Id=${data.id}`}/>
          <NavigationButton label="Master first link abs" className="mr-3"
                            to={`/link-abs?masterFirstId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Code" sm={[2, 10]} value={data.code}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
      </>
    }
  </DetailScreen>
