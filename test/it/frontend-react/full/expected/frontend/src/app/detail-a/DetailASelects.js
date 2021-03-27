import React from 'react'
import { masterALabel } from '../master-a/MasterASelects'
import { AsyncSelect } from '../../shared'
import { listDetailAs, useDetailA } from './detail-a-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const detailALabel = data => data && entityLabel(', ',
  data.code,
  data.name,
  masterALabel(data.master))

export const DetailASelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listDetailAs({ code: query })}
               getOptionValue={option => option.id}
               getOptionLabel={detailALabel}
               restoredValue={useRestored(name + 'Id', useDetailA)}
               name={name}
               {...rest}/>
