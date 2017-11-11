import React, { Component } from 'react'
import { shape, func, number } from 'prop-types'

import EventView from 'Season/EventView'
import Tabs from 'shared/Tabs'
import TGText from 'shared/TGText'
import { userShape, seasonShape } from 'propTypes'

const getRightButton = (weekIndex, eventCount, navigate) => {
  if (weekIndex < eventCount - 1) {
    return (
      <TGText onPress={() => navigate('Week', { weekIndex: weekIndex + 1 })}>
        {eventCount - (weekIndex + 1)}
      </TGText>
    )
  }
  return null
}

class WeekView extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const weekIndex =
      navigation.state.params && navigation.state.params.weekIndex
        ? navigation.state.params.weekIndex
        : 0
    const eventCount = screenProps.season.eventIds.length
    return {
      title: `Vecka ${eventCount - weekIndex}`,
      headerRight: getRightButton(weekIndex, eventCount, navigation.navigate)
    }
  }

  static propTypes = {
    navigation: shape({
      navigate: func.isRequired,
      state: shape({
        params: shape({
          weekIndex: number
        })
      })
    }).isRequired,
    screenProps: shape({
      currentUser: userShape,
      season: seasonShape.isRequired
    }).isRequired
  }

  state = { sorting: 'totalPoints' }

  changeWeek = (weekIndex) => {
    this.props.navigation.navigate('Week', { weekIndex })
  }

  changeSort = (sorting) => {
    this.setState(state => ({ ...state, sorting }))
  }

  render() {
    const { season, currentUser } = this.props.screenProps
    const { state } = this.props.navigation
    const { sorting } = this.state

    const weekIndex = (state.params && state.params.weekIndex) || 0
    const reversedEventIds = season.eventIds.slice().sort((a, b) => b - a)
    const eventId = `${reversedEventIds[weekIndex]}`
    const currentUserId = currentUser ? currentUser.id : null

    return [
      <EventView
        key={`eventView_${eventId}`}
        eventId={eventId}
        seasonId={season.id}
        currentUserId={currentUserId}
        sorting={sorting}
      />,
      parseInt(season.name, 10) > 2015 && (
        <Tabs key="weekSortTabs" currentRoute={sorting} onChange={sort => this.changeSort(sort)} />
      )
    ]
  }
}

export default WeekView
