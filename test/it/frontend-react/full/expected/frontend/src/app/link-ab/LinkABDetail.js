import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { masterALabel } from '../master-a/MasterASelects'
import { masterBLabel } from '../master-b/MasterBSelects'
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
            {masterALabel(data.masterFirst)}
          </Link>
        </StaticGroup>
        <StaticGroup label="Master second" sm={[2, 10]}>
          <Link to={`/master-bs/${data.masterSecond?.id}`}>
            {masterBLabel(data.masterSecond)}
          </Link>
        </StaticGroup>
      </>
    }
  </DetailScreen>
