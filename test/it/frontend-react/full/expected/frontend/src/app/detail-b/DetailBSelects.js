import React from 'react'
import { AsyncSelect } from '../../shared'
import { listDetailBs, useDetailB } from './detail-b-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const detailBLabel = data => data && entityLabel(', ', data.name)

export const DetailBSelect = props =>
  <AsyncSelect searchFn={query => listDetailBs({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={detailBLabel}
               {...props}/>

export const DetailBSearchSelect = ({ name, ...rest }) =>
  <DetailBSelect
    restoredValue={useRestored(name + 'Id', useDetailB)}
    name={name}
    {...rest}/>
