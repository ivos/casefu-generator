import React from 'react'
import { AsyncSelect } from '../../shared'
import { listHierarchies, useHierarchy } from './hierarchy-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const hierarchyLabel = data => data && entityLabel(', ', data.parent)

export const HierarchySelect = props =>
  <AsyncSelect searchFn={query => listHierarchies({ parent: query })}
               getOptionValue={option => option.id}
               getOptionLabel={hierarchyLabel}
               {...props}/>

export const HierarchySearchSelect = ({ name, ...rest }) =>
  <HierarchySelect
    restoredValue={useRestored(name + 'Id', useHierarchy)}
    name={name}
    {...rest}/>
