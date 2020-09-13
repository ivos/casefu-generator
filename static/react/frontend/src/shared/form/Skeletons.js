import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useTimeout } from 'react-use'
import { defaultPageSize, skeletonDelay } from '../../constants'

export const SkeletonForm = ({ rows = 3, height = 49 }) => {
  const [show] = useTimeout(skeletonDelay)

  return show() && <Skeleton count={rows} height={height}/>
}

export const SkeletonTableRows = ({ columns }) => {
  const [show] = useTimeout(skeletonDelay)

  return show() && [...Array(defaultPageSize)]
    .map((_, row) =>
      <tr key={row}>
        {
          [...Array(columns)]
            .map((_, column) => (
              <td key={column}>
                <Skeleton/>
              </td>
            ))
        }
      </tr>
    )
}
