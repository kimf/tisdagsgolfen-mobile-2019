import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'
import { bool, func, string } from 'prop-types'

import Leaderboard from '../Leaderboard/Leaderboard'
import EventResult from './EventResult'
import EventViewLoader from './EventViewLoader'
import Sorter from './Sorter'
import EventHeader from '../Events/EventHeader'

import { colors, deviceWidth } from '../../styles'
import { eventQueryProps, withEventQuery } from '../../graph/queries/eventQuery'

const swipeCardStyle = {
  width: deviceWidth - 20,
  padding: 5,
  backgroundColor: '#fff',
  shadowColor: colors.gray,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 2,
  shadowOpacity: 0.5,
  elevation: 5,
  borderRadius: 10
}

class EventView extends Component {
  static propTypes = {
    currentUserId: string,
    eventId: string.isRequired,
    eventIndex: string.isRequired,
    seasonId: string.isRequired,
    data: eventQueryProps.isRequired,
    sorting: string.isRequired,
    showSorter: bool.isRequired,
    changeSort: func.isRequired
  }

  static defaultProps = {
    currentUserId: null
  }

  render() {
    const {
      eventId,
      seasonId,
      currentUserId,
      sorting,
      showSorter,
      changeSort,
      data: { loading, event, players }
    } = this.props

    if (loading) {
      return <EventViewLoader />
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <EventHeader
            key={`eventHeader_${eventId}`}
            course={event.course}
            teamEvent={event.teamEvent}
            scoringType={event.scoringType}
          />

          {showSorter && (
            <Sorter key="weekSortTabs" current={sorting} onChange={sort => changeSort(sort)} />
          )}
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
            paddingBottom: 20,
            paddingTop: 5,
            backgroundColor: colors.lightGray
          }}>
          <View style={[swipeCardStyle, { marginLeft: 5, marginRight: 5 }]}>
            <Leaderboard
              sorting={sorting}
              currentUserId={currentUserId}
              players={players}
              seasonId={seasonId}
              eventId={eventId}
            />
          </View>
          <View style={[swipeCardStyle, { marginRight: 10 }]}>
            <EventResult
              eventId={eventId}
              seasonId={seasonId}
              sorting={sorting}
              currentUserId={currentUserId}
              players={event.leaderboard}
              scoringType={event.scoringType}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default withEventQuery(EventView)
