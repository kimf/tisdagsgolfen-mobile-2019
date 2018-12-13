import React from 'react'
import EmptyState from './EmptyState'
import Loading from './Loading'
interface LoadingOrEmptyStateProps {
  loading?: any
  items?: any[]
  name: any
}
const LoadingOrEmptyState: React.SFC<LoadingOrEmptyStateProps> = ({
  loading = true,
  items = [],
  name
}) => {
  if (loading) {
    return <Loading text={`Laddar ${name}`} />
  }
  if (!items || items.length === 0) {
    return <EmptyState text={`Oj det fanns inga ${name}`} />
  }
  return null
}

export default EmptyState
