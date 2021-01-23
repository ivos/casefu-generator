import React from 'react'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { sentenceCase } from 'change-case'
import { usePerson } from './person-api'

export default () =>
  <DetailScreen
    title="Person detail"
    entityTitle="Person"
    rows={7}
    useResourceGet={usePerson}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Personal number" sm={[2, 10]} value={data.personalNumber}/>
        <StaticGroup label="Family name" sm={[2, 10]} value={data.familyName}/>
        <StaticGroup label="Given names" sm={[2, 10]} value={data.givenNames}/>
        <StaticGroup label="User name" sm={[2, 10]} value={data.userName}/>
        <StaticGroup label="Email" sm={[2, 10]} value={data.email}/>
        <StaticGroup label="Sex" sm={[2, 10]} value={sentenceCase(data.sex)}/>
      </>
    }
  </DetailScreen>
