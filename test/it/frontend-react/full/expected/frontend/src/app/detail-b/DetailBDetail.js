import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { masterALabel } from '../master-a/MasterASelects'
import { masterBLabel } from '../master-b/MasterBSelects'
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
            {masterALabel(data.masterA1)}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master a2" sm={[2, 10]}>
          <Link to={`/master-as/${data.masterA2?.id}`}>
            {masterALabel(data.masterA2)}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master b1" sm={[2, 10]}>
          <Link to={`/master-bs/${data.masterB1?.id}`}>
            {masterBLabel(data.masterB1)}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master b2" sm={[2, 10]}>
          <Link to={`/master-bs/${data.masterB2?.id}`}>
            {masterBLabel(data.masterB2)}
          </Link>
        </StaticGroup>
      </>
    }
  </DetailScreen>
