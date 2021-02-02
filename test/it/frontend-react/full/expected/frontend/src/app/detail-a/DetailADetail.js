import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { useDetailA } from './detail-a-api'

export default () =>
  <DetailScreen
    title="Detail a detail"
    entityTitle="Detail a"
    rows={4}
    useResourceGet={useDetailA}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Code" sm={[2, 10]} value={data.code}/>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
        <StaticGroup label="Master" sm={[2, 10]}>
          <Link to={`/master-as/${data.master?.id}`}>
            {data.master?.code}
          </Link>
        </StaticGroup>
      </>
    }
  </DetailScreen>
