import React, { Component } from 'react'
import { View, Animated, Easing } from 'react-native'
import { string } from 'prop-types'

import Leaderboard from 'Leaderboard/Leaderboard'
import EventResult from 'Season/EventResult'
import EventHeader from 'Events/EventHeader'
import AnimatedModal from 'shared/AnimatedModal'
import Loading from 'shared/Loading'

import { deviceHeight } from 'styles'
import { eventQueryProps, withEventQuery } from 'queries/eventQuery'

const TOP = 180
const BOTTOM = deviceHeight - 60

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

  eventResult = new Animated.Value(0)
  iconPos = new Animated.Value(0)
  open = false

  animateEventResult = (open) => {
    this.open = open
    const duration = 450
    const useNativeDriver = true
    Animated.parallel([
      Animated.timing(this.eventResult, {
        toValue: open ? BOTTOM : TOP,
        easing: Easing.ease,
        duration,
        useNativeDriver
      }),
      Animated.timing(this.iconPos, {
        toValue: open ? 1 : 0,
        easing: Easing.ease,
        duration,
        useNativeDriver
      })
    ]).start()
  }

  toggleEventResult = () => this.animateEventResult(!this.open)

  render() {
    const {
      eventId,
      seasonId,
      currentUserId,
      sorting,
      data: { loading, event, players }
    } = this.props
    if (loading) {
      return <Loading text="Laddar massa data..." />
    }

    const eventResultPos = this.eventResult.interpolate({
      inputRange: [TOP, BOTTOM],
      outputRange: [BOTTOM, TOP],
      extrapolate: 'clamp'
    })

    const iconPos = this.iconPos.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '-180deg']
    })

    return (
      <View style={{ flex: 1 }}>
        <Leaderboard
          sorting={sorting}
          currentUserId={currentUserId}
          players={players}
          seasonId={seasonId}
          eventId={eventId}
        />
        <AnimatedModal height={deviceHeight} position={eventResultPos}>
          <EventHeader
            key={`eventHeader_${eventId}`}
            course={event.course}
            teamEvent={event.teamEvent}
            scoringType={event.scoringType}
            toggle={this.toggleEventResult}
            position={eventResultPos}
            imageSpin={iconPos}
          />
          <EventResult
            eventId={eventId}
            seasonId={seasonId}
            sorting={sorting}
            currentUserId={currentUserId}
            players={event.leaderboard}
            scoringType={event.scoringType}
          />
        </AnimatedModal>
      </View>
    )
  }
}

export default withEventQuery(EventView)
