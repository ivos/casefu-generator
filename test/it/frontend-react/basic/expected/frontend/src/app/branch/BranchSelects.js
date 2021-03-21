import React from 'react'
import { sentenceCase } from 'change-case'
import { AsyncSelect } from '../../shared'
import { listBranches, useBranch } from './branch-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const branchLabel = data => data && entityLabel(', ',
  data.street,
  data.city,
  data.zipCode,
  sentenceCase(data.type || ''),
  data.note)

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
