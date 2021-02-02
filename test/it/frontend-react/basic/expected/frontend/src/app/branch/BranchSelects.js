import React from 'react'
import { AsyncSelect } from '../../shared'
import { listBranches, useBranch } from './branch-api'
import { useRestored } from '../../shared/utils'

export const BranchSelect = props =>
  <AsyncSelect searchFn={query => listBranches({ street: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.street}
               {...props}/>

export const BranchSearchSelect = ({ name, ...rest }) =>
  <BranchSelect
    restoredValue={useRestored(name + 'Id', useBranch)}
    name={name}
    {...rest}/>
