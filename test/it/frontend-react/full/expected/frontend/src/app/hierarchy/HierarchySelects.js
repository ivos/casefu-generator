import React from 'react'
import { AsyncSelect } from '../../shared'
import { listHierarchies, useHierarchy } from './hierarchy-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const hierarchyLabel = data => data && entityLabel(', ',
  hierarchyLabel(data.parent),
  data.name)

export const HierarchySelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listHierarchies({ parent: query })}
               getOptionValue={option => option.id}
               getOptionLabel={hierarchyLabel}
               restoredValue={useRestored(name + 'Id', useHierarchy)}
               name={name}
               {...rest}/>
