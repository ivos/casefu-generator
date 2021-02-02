import React from 'react'
import { AsyncSelect } from '../../shared'
import { listMasterAs, useMasterA } from './master-a-api'
import { useRestored } from '../../shared/utils'

export const MasterASelect = props =>
  <AsyncSelect searchFn={query => listMasterAs({ code: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.code}
               {...props}/>

export const MasterASearchSelect = ({ name, ...rest }) =>
  <MasterASelect
    restoredValue={useRestored(name + 'Id', useMasterA)}
    name={name}
    {...rest}/>
