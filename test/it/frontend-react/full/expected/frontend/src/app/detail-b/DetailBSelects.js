import React from 'react'
import { masterALabel } from '../master-a/MasterASelects'
import { masterBLabel } from '../master-b/MasterBSelects'
import { AsyncSelect } from '../../shared'
import { listDetailBs, useDetailB } from './detail-b-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const detailBLabel = data => data && entityLabel(', ',
  data.name,
  masterALabel(data.masterA1),
  masterALabel(data.masterA2),
  masterBLabel(data.masterB1),
  masterBLabel(data.masterB2))

export const DetailBSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listDetailBs({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={detailBLabel}
               restoredValue={useRestored(name + 'Id', useDetailB)}
               name={name}
               {...rest}/>
