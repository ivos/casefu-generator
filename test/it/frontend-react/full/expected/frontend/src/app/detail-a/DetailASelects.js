import React from 'react'
import { AsyncSelect } from '../../shared'
import { listDetailAs, useDetailA } from './detail-a-api'
import { useRestored } from '../../shared/utils'

export const DetailASelect = props =>
  <AsyncSelect searchFn={query => listDetailAs({ code: query })}
               getOptionValue={option => option.id}
               getOptionLabel={option => option.code}
               {...props}/>

export const DetailASearchSelect = ({ name, ...rest }) =>
  <DetailASelect
    restoredValue={useRestored(name + 'Id', useDetailA)}
    name={name}
    {...rest}/>
