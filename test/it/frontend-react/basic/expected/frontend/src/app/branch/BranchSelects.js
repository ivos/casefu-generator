import React from 'react'
import { AsyncSelect } from '../../shared'
import { listBranches, useBranch } from './branch-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const branchLabel = data => data && entityLabel(', ', data.street)

export const BranchSelect = props =>
  <AsyncSelect searchFn={query => listBranches({ street: query })}
               getOptionValue={option => option.id}
               getOptionLabel={branchLabel}
               {...props}/>

export const BranchSearchSelect = ({ name, ...rest }) =>
  <BranchSelect
    restoredValue={useRestored(name + 'Id', useBranch)}
    name={name}
    {...rest}/>
