import React from 'react'
import { AsyncSelect } from '../../shared'
import { listLinkAbs, useLinkAB } from './link-ab-api'
import { entityLabel, useRestored } from '../../shared/utils'

export const linkAbLabel = data => data && entityLabel(', ', data.masterFirst)

export const LinkABSelect = props =>
  <AsyncSelect searchFn={query => listLinkAbs({ masterFirst: query })}
               getOptionValue={option => option.id}
               getOptionLabel={linkAbLabel}
               {...props}/>

export const LinkABSearchSelect = ({ name, ...rest }) =>
  <LinkABSelect
    restoredValue={useRestored(name + 'Id', useLinkAB)}
    name={name}
    {...rest}/>
