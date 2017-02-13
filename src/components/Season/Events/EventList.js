import React from 'react'
import { View, ListView } from 'react-native'

import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'
import Button from '../../Shared/Button'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const EventList = ({ events, gotoEvent, openNewRoundModal }) => {
  if (events.length === 0) {
    return <EmptyState text="Inga rundor :(" />
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <ListView
        initialListSize={100}
        dataSource={ds.cloneWithRows(events)}
        renderRow={rowData => <EventCard event={rowData} gotoEvent={gotoEvent} />}
        enableEmptySections
      />
      <Button text="+ Lägg till ny runda" onPress={openNewRoundModal} />
    </View>
  )
}

const { arrayOf, shape, func } = React.PropTypes

EventList.propTypes = {
  events: arrayOf(shape().isRequired).isRequired,
  gotoEvent: func.isRequired,
  openNewRoundModal: func.isRequired
}

export default EventList
