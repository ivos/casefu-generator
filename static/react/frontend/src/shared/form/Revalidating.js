import React from 'react'
import './Revalidating.css'

export default ({ isValidating, as = 'div', ...rest }) => {
  const TagName = as
  return <TagName className={isValidating ? 'revalidating' : ''} {...rest}/>
}
