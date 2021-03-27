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

export const BranchSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listBranches({ street: query })}
               getOptionValue={option => option.id}
               getOptionLabel={branchLabel}
               restoredValue={useRestored(name + 'Id', useBranch)}
               name={name}
               {...rest}/>
