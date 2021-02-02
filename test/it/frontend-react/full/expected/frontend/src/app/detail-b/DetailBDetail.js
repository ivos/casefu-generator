import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { useDetailB } from './detail-b-api'

export default () =>
  <DetailScreen
    title="Detail b detail"
    entityTitle="Detail b"
    rows={6}
    useResourceGet={useDetailB}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
        <StaticGroup label="Master a1" sm={[2, 10]}>
          <Link to={`/master-as/${data.masterA1?.id}`}>
            {data.masterA1?.code}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master a2" sm={[2, 10]}>
          <Link to={`/master-as/${data.masterA2?.id}`}>
            {data.masterA2?.code}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master b1" sm={[2, 10]}>
          <Link to={`/master-bs/${data.masterB1?.id}`}>
            {data.masterB1?.name}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master b2" sm={[2, 10]}>
          <Link to={`/master-bs/${data.masterB2?.id}`}>
            {data.masterB2?.name}
          </Link>
        </StaticGroup>
      </>
    }
  </DetailScreen>
