import React from 'react'
import { AsyncSelect } from '../../shared'
import { listMasterBs, useMasterB } from './master-b-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const masterBLabel = data => data && entityLabel(', ', data.name)

export const MasterBSelect = props =>
  <AsyncSelect searchFn={query => listMasterBs({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={masterBLabel}
               {...props}/>

export const MasterBSearchSelect = ({ name, ...rest }) =>
  <MasterBSelect
    restoredValue={useRestored(name + 'Id', useMasterB)}
    name={name}
    {...rest}/>
