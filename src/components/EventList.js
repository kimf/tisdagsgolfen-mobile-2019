import React, { PropTypes } from 'react'
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

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shapeOf({
      id: PropTypes.number.isRequired,
      scoringType: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      teamEvent: PropTypes.bool.isRequired,
      club: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  gotoEvent: PropTypes.func.isRequired
}

export default EventList
