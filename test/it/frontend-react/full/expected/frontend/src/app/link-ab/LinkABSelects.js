import React from 'react'
import { masterALabel } from '../master-a/MasterASelects'
import { masterBLabel } from '../master-b/MasterBSelects'
import { AsyncSelect } from '../../shared'
import { listLinkAbs, useLinkAB } from './link-ab-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const linkAbLabel = data => data && entityLabel(', ',
  masterALabel(data.masterFirst),
  masterBLabel(data.masterSecond))

export const LinkABSelect = ({ name, ...rest }) =>
  <AsyncSelect searchFn={query => listLinkAbs({ masterFirst: query })}
               getOptionValue={option => option.id}
               getOptionLabel={linkAbLabel}
               restoredValue={useRestored(name + 'Id', useLinkAB)}
               name={name}
               {...rest}/>
