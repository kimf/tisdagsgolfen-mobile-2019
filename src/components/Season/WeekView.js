import React, { Component } from 'react'

import WeekHeader from 'Season/WeekHeader'
import FinalWeek from 'Season/FinalWeek'
import EventView from 'Season/EventView'
import Tabs from 'shared/Tabs'

import { userShape, seasonShape } from 'propTypes'

class WeekView extends Component {
  static propTypes = {
    currentUser: userShape,
    season: seasonShape.isRequired
  }

  static defaultProps = {
    currentUser: null
  }

  state = { weekIndex: 0, sorting: 'totalPoints' }

  changeWeek = (weekIndex) => {
    this.setState(state => ({ ...state, weekIndex }))
  }

  changeSort = (sorting) => {
    this.setState(state => ({ ...state, sorting }))
  }

  render() {
    const { season, currentUser } = this.props
    const { weekIndex, sorting } = this.state

    const reversedEventIds = season.eventIds.slice().sort((a, b) => b - a)

    const eventIds = season.closed ? ['final', ...reversedEventIds] : reversedEventIds

    const eventId = `${eventIds[weekIndex]}`

    if (eventId === 'final') {
      return (
        <FinalWeek
          key="finalweek"
          season={season}
          onGoToResult={() => this.changeWeek(weekIndex + 1)}
        />
      )
    }

    const currentUserId = currentUser ? currentUser.id : null

    const eventCount = eventIds.length
    const reversedIndex = eventCount - weekIndex
    const weekName = `Vecka ${season.closed ? reversedIndex : reversedIndex}`

    return [
      <WeekHeader
        key={`weekHeader_${season.id}`}
        eventCount={eventCount}
        weekIndex={weekIndex}
        weekName={weekName}
        onChangeWeek={this.changeWeek}
      />,
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
