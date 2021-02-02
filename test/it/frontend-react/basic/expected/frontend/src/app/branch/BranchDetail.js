import React from 'react'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
import { useBranch } from './branch-api'

export default () =>
  <DetailScreen
    title="Branch detail"
    entityTitle="Branch"
    rows={6}
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
        <StaticGroup label="Type" sm={[2, 10]} value={sentenceCase(data.type || '')}/>
        <StaticGroup label="Note" sm={[2, 10]} value={data.note}/>
      </>
    }
  </DetailScreen>
