import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, StaticGroup } from '../../shared'
import { locationLabel } from '../location/LocationSelects'
import { sentenceCase } from 'change-case'
import { useEvent } from './event-api'
import { formatDateTime } from '../../i18n'

export default () =>
  <DetailScreen
    title="Event detail"
    entityTitle="Event"
    rows={4}
    useResourceGet={useEvent}
    buttons={
      () =>
        <>
          <EditButton className="mr-3" autoFocus/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Time" sm={[2, 10]} value={formatDateTime(data.time)}/>
        <StaticGroup label="Status" sm={[2, 10]} value={sentenceCase(data.status || '')}/>
        <StaticGroup label="Location" sm={[2, 10]}>
          <Link to={`/locations/${data.location?.id}`}>
            {locationLabel(data.location)}
          </Link>
        </StaticGroup>
      </>
    }
  </DetailScreen>
