import React from 'react'
import { bool, arrayOf, any, string } from 'prop-types'

import Loading from './Loading'
import EmptyState from './EmptyState'

const LoadingOrEmptyState = ({ loading, items, name }) => {
  if (loading) {
    return <Loading text={`Laddar ${name}`} />
  }
  if (!items || items.length === 0) {
    return <EmptyState text={`Oj det fanns inga ${name}`} />
  }

  return null
}

LoadingOrEmptyState.propTypes = {
  loading: bool,
  items: arrayOf(any),
  name: string.isRequired
}

LoadingOrEmptyState.defaultProps = {
  loading: true,
  items: []
}

export default EmptyState
