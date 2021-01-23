import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Revalidating } from '../form'
import { onEnter } from '../utils'

export default ({ searchValues, $page, setLastPage, url, useResourceList, children }) => {
  const { data, isValidating } = useResourceList(searchValues, $page)
  const history = useHistory()

  useEffect(() => {
    if (data.length === 0) {
      setLastPage()
    }
  })

  const gotoDetail = id => () => {
    history.push(`${url}/${id}`)
  }

  return data.map(item =>
    <Revalidating as="tr"
                  isValidating={isValidating}
                  key={item.id}
                  tabIndex="0" onClick={gotoDetail(item.id)} onKeyUp={onEnter(gotoDetail(item.id))}>
      {children(item)}
    </Revalidating>
  )
}
