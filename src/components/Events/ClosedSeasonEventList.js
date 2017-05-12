import React, { PropTypes } from 'react'
import { View, FlatList } from 'react-native'

import EventCard from 'Events/EventCard'
import { eventShape } from 'propTypes'

const { arrayOf, string, func } = PropTypes

const ClosedSeasonEventList = ({ events, userId, onNavigate }) => (
  <View style={{ flex: 1 }}>
    <FlatList
      removeClippedSubviews={false}
      style={{ paddingHorizontal: 5 }}
      data={events}
      renderItem={({ item }) => (
        <EventCard userId={userId} event={item} onNavigate={onNavigate} />
      )}
      keyExtractor={item => `event_${item.id}}`}
    />
  </View>
)

ClosedSeasonEventList.propTypes = {
  events: arrayOf(eventShape).isRequired,
  userId: string.isRequired,
  onNavigate: func.isRequired
}

export default ClosedSeasonEventList
