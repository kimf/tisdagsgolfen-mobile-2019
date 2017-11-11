import React, { Component } from 'react'
import { View } from 'react-native'
import { string } from 'prop-types'

import Leaderboard from 'Leaderboard/Leaderboard'
import EventResult from 'Season/EventResult'
import EventHeader from 'Events/EventHeader'
import Tabs from 'shared/Tabs'
import Loading from 'shared/Loading'
import styles, { colors } from 'styles'

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

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.blue,
            padding: 10
          }
        ]}
      >
        <EventHeader
          course={event.course}
          teamEvent={event.teamEvent}
          scoringType={event.scoringType}
        />

        <Tabs
          leaderboard
          currentRoute={leaderboardType}
          onChange={sort => this.changeLeaderboardType(sort)}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'stretch',
            paddingBottom: 5,
            borderRadius: 5,
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
      </View>
    )
  }
}

export default withEventQuery(EventView)
