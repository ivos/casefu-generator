import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { useLinkAB } from './link-ab-api'

export default () =>
  <DetailScreen
    title="Link ab detail"
    entityTitle="Link ab"
    rows={3}
    useResourceGet={useLinkAB}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Master first" sm={[2, 10]}>
          <Link to={`/master-as/${data.masterFirst?.id}`}>
            {data.masterFirst?.code}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master second" sm={[2, 10]}>
          <Link to={`/master-bs/${data.masterSecond?.id}`}>
            {data.masterSecond?.name}
          </Link>
        </StaticGroup>
      </>
    }
  </DetailScreen>
