import React from 'react'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { useBranch } from './branch-api'

export default () =>
  <DetailScreen
    title="Branch detail"
    entityTitle="Branch"
    rows={5}
    useResourceGet={useBranch}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Street" sm={[2, 10]} value={data.street}/>
        <StaticGroup label="City" sm={[2, 10]} value={data.city}/>
        <StaticGroup label="Zip code" sm={[2, 10]} value={data.zipCode}/>
        <StaticGroup label="Note" sm={[2, 10]} value={data.note}/>
      </>
    }
  </DetailScreen>
