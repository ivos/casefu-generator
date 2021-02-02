import React from 'react'
import { AsyncSelect } from '../../shared'
import { listMasterBs, useMasterB } from './master-b-api'
import { useRestored } from '../../shared/utils'

export const MasterBSelect = props =>
  <AsyncSelect searchFn={query => listMasterBs({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...props}/>

export const MasterBSearchSelect = ({ name, ...rest }) =>
  <MasterBSelect
    restoredValue={useRestored(name + 'Id', useMasterB)}
    name={name}
    {...rest}/>
