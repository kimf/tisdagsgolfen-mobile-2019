import React, { Component } from 'react'
import { View } from 'react-native'
import { shape } from 'prop-types'

import EventView from 'Season/EventView'
import WeekPicker from 'Season/WeekPicker'
import Tabs from 'shared/Tabs'
import { userShape, seasonShape } from 'propTypes'
import styles, { colors } from 'styles'

class WeekView extends Component {
  static propTypes = {
    screenProps: shape({
      currentUser: userShape,
      season: seasonShape.isRequired
    }).isRequired
  }

  state = { sorting: 'totalPoints', weekIndex: 0 }

  changeWeek = (weekIndex) => {
    console.log(weekIndex)
    this.setState(state => ({ ...state, weekIndex }))
  }

  changeSort = (sorting) => {
    this.setState(state => ({ ...state, sorting }))
  }

  render() {
    const { season, currentUser } = this.props.screenProps
    const { sorting, weekIndex } = this.state

    const reversedEventIds = season.eventIds.slice().reverse()
    const reversedIndexArray = [...Array(reversedEventIds.length)].map((a, i) => i).reverse()
    const eventId = `${reversedEventIds[weekIndex || 0]}`
    const currentUserId = currentUser ? currentUser.id : null

    return [
      parseInt(season.name, 10) > 2015 && (
        <Tabs key="weekSortTabs" currentRoute={sorting} onChange={sort => this.changeSort(sort)} />
      ),
      <WeekPicker
        key={`weekPicker_${eventId}`}
        weeks={reversedIndexArray}
        currentIndex={reversedIndexArray[weekIndex]}
        onChangeWeek={this.changeWeek}
      />,
      <View key={`eventView_${eventId}`} style={[styles.container]}>
        <EventView
          eventId={eventId}
          seasonId={season.id}
          currentUserId={currentUserId}
          sorting={sorting}
        />
      </View>
    ]
  }
}

export default WeekView
