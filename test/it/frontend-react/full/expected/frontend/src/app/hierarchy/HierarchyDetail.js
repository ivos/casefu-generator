import React from 'react'
import { Link } from 'react-router-dom'
import { DetailScreen, EditButton, NavigationButton, StaticGroup } from '../../shared'
import { hierarchyLabel } from '../hierarchy/HierarchySelects'
import { useHierarchy } from './hierarchy-api'

export default () =>
  <DetailScreen
    title="Hierarchy detail"
    entityTitle="Hierarchy"
    rows={3}
    useResourceGet={useHierarchy}
    buttons={
      (data) =>
        <>
          <EditButton className="mr-3" autoFocus/>

          <NavigationButton label="Parent hierarchies" className="mr-3"
                            to={`/hierarchies?parentId=${data.id}`}/>
        </>
    }>
    {data =>
      <>
        <StaticGroup label="Id" sm={[2, 10]} value={data.id}/>
        <StaticGroup label="Parent" sm={[2, 10]}>
          <Link to={`/hierarchies/${data.parent?.id}`}>
            {hierarchyLabel(data.parent)}
          </Link>
        </StaticGroup>
        <StaticGroup label="Name" sm={[2, 10]} value={data.name}/>
      </>
    }
  </DetailScreen>
