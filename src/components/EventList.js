import React from 'react'
import { ListView } from 'react-native'

import EventCard from './EventCard'
import EmptyState from './EmptyState'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const EventList = ({ events, gotoEvent }) => {
  if (events.length === 0) {
    return <EmptyState text="Inga rundor :(" />
  }

  return (
    <ListView
      initialListSize={100}
      dataSource={ds.cloneWithRows(events)}
      renderRow={rowData => <EventCard event={rowData} gotoEvent={gotoEvent} />}
      style={{ flex: 1, backgroundColor: '#eee' }}
      enableEmptySections
    />
  )
}

const { arrayOf, shape, func } = React.PropTypes

EventList.propTypes = {
  events: arrayOf(shape().isRequired).isRequired,
  gotoEvent: func.isRequired
}

export default EventList
