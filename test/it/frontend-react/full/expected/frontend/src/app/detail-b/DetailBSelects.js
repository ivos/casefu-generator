import React from 'react'
import { AsyncSelect } from '../../shared'
import { listDetailBs, useDetailB } from './detail-b-api'
import { useRestored } from '../../shared/utils'

export const DetailBSelect = props =>
  <AsyncSelect searchFn={query => listDetailBs({ name: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.name}
               {...props}/>

export const DetailBSearchSelect = ({ name, ...rest }) =>
  <DetailBSelect
    restoredValue={useRestored(name + 'Id', useDetailB)}
    name={name}
    {...rest}/>
