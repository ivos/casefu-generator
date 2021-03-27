import React from 'react'
import { AsyncSelect } from '../../shared'
import { listMasterBs, useMasterB } from './master-b-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const masterBLabel = data => data && entityLabel(', ',
  data.name)

export const MasterBSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listMasterBs({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={masterBLabel}
               restoredValue={useRestored(name + 'Id', useMasterB)}
               name={name}
               {...rest}/>
