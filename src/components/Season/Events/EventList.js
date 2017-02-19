import React from 'react'
import { View, ListView } from 'react-native'

import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'
import Button from '../../Shared/Button'

import { sortedByParsedDate } from '../../../utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const addNewButton = (seasonClosed, onPress) => {
  if (seasonClosed) {
    return null
  }
  return <Button text="+ Lägg till ny runda" onPress={onPress} />
}

const EventList = ({ events, gotoEvent, openNewRoundModal, seasonClosed }) => {
  if (events.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <EmptyState text="Inga rundor :(" />
        {addNewButton(seasonClosed, openNewRoundModal)}
      </View>
    )
  }

  const sortedEvents = sortedByParsedDate(events, 'startsAt')

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <ListView
        initialListSize={100}
        dataSource={ds.cloneWithRows(sortedEvents)}
        renderRow={rowData => <EventCard event={rowData} gotoEvent={gotoEvent} />}
        enableEmptySections
      />
      {addNewButton(seasonClosed, openNewRoundModal)}
    </View>
  )
}

const { arrayOf, bool, shape, func } = React.PropTypes

EventList.propTypes = {
  events: arrayOf(shape()).isRequired,
  gotoEvent: func.isRequired,
  openNewRoundModal: func.isRequired,
  seasonClosed: bool.isRequired
}


export default EventList
