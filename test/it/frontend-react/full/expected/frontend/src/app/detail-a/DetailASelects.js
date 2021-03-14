import React from 'react'
import { AsyncSelect } from '../../shared'
import { listDetailAs, useDetailA } from './detail-a-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const detailALabel = data => data && entityLabel(', ', data.code)

export const DetailASelect = props =>
  <AsyncSelect searchFn={query => listDetailAs({ code: query })}
               getOptionValue={option => option.id}
               getOptionLabel={detailALabel}
               {...props}/>

export const DetailASearchSelect = ({ name, ...rest }) =>
  <DetailASelect
    restoredValue={useRestored(name + 'Id', useDetailA)}
    name={name}
    {...rest}/>
