import React, { Component } from 'react'
import { View } from 'react-native'
import { string } from 'prop-types'

import Leaderboard from 'Leaderboard/Leaderboard'
import EventResult from 'Season/EventResult'
import EventHeader from 'Events/EventHeader'
import Tabs from 'shared/Tabs'
import Loading from 'shared/Loading'

import { eventQueryProps, withEventQuery } from 'queries/eventQuery'

class EventView extends Component {
  static propTypes = {
    currentUserId: string,
    sorting: string.isRequired,
    eventId: string.isRequired,
    seasonId: string.isRequired,
    data: eventQueryProps.isRequired
  }

  static defaultProps = {
    currentUserId: null
  }

  state = {
    leaderboardType: 'season'
  }

  changeLeaderboardType = (leaderboardType) => {
    this.setState(state => ({ ...state, leaderboardType }))
  }

  render() {
    const {
      eventId,
      seasonId,
      currentUserId,
      sorting,
      data: { loading, event, players }
    } = this.props
    const { leaderboardType } = this.state

    if (loading) {
      return <Loading text="Laddar massa data..." />
    }

    return [
      <EventHeader
        key={`eventHeader_${eventId}`}
        course={event.course}
        teamEvent={event.teamEvent}
        scoringType={event.scoringType}
      />,

      <Tabs
        key={`leaderboardTabs_${eventId}`}
        leaderboard
        currentRoute={leaderboardType}
        onChange={sort => this.changeLeaderboardType(sort)}
      />,
      <View
        key={`eventContent_${eventId}`}
        style={{
          flex: 1,
          alignItems: 'stretch',
          paddingBottom: 5,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: 'white'
        }}
      >
        {leaderboardType === 'season' ? (
          <Leaderboard
            sorting={sorting}
            currentUserId={currentUserId}
            players={players}
            seasonId={seasonId}
            eventId={eventId}
          />
        ) : (
          <EventResult
            eventId={eventId}
            seasonId={seasonId}
            sorting={sorting}
            currentUserId={currentUserId}
            players={event.leaderboard}
            scoringType={event.scoringType}
          />
        )}
      </View>
    ]
  }
}

export default withEventQuery(EventView)
