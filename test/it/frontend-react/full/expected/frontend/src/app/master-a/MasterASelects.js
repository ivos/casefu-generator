import React from 'react'
import { AsyncSelect } from '../../shared'
import { listMasterAs, useMasterA } from './master-a-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const masterALabel = data => data && entityLabel(', ',
  data.code,
  data.name)

export const MasterASelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listMasterAs({ code: query })}
               getOptionValue={option => option.id}
               getOptionLabel={masterALabel}
               restoredValue={useRestored(name + 'Id', useMasterA)}
               name={name}
               {...rest}/>
