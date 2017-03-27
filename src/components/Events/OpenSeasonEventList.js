import React, { PropTypes } from 'react'
import { View, FlatList } from 'react-native'

import SubHeader from 'shared/SubHeader'
import EventCard from 'Events/EventCard'
import { eventShape } from 'propTypes'
import styles from 'styles'

const { arrayOf, string, func } = PropTypes

const OpenSeasonEventList = ({ events, userId, onNavigate }) => {
  const playedEvents = events.filter(e => e.status === 'finished')
  const unPlayedEvents = events.filter(e => e.status !== 'finished')
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.topSection}>
        <FlatList
          style={{ paddingHorizontal: 20 }}
          horizontal
          data={unPlayedEvents}
          showsHorizontalScrollIndicator={false}
          paging
          bounces
          pagingEnabled
          renderItem={({ item }) => (
            <EventCard
              layoutStyle="plannedEvent"
              userId={userId}
              event={item}
              onNavigate={onNavigate}
            />
          )}
          keyExtractor={item => `event_${item.id}}`}
        />
      </View>

      <View style={styles.bottomSection}>
        <SubHeader title="Färdigspelade" />
        <FlatList
          horizontal
          data={playedEvents}
          renderItem={({ item }) => (
            <EventCard
              layoutStyle="playedEvent"
              userId={userId}
              event={item}
              onNavigate={onNavigate}
            />
          )}
          keyExtractor={item => `event_${item.id}}`}
        />
      </View>
    </View>
  )
}

OpenSeasonEventList.propTypes = {
  events: arrayOf(eventShape).isRequired,
  userId: string.isRequired,
  onNavigate: func.isRequired
}

export default OpenSeasonEventList
