import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { arrayOf, string, shape, func } from 'prop-types'

import WeekPicker from 'Season/WeekPicker'
import EventView from 'Season/EventView'
import FinalWeek from 'Season/FinalWeek'
import { seasonShape } from 'propTypes'
import { linear } from 'animations'

const withChangeSort = WrappedWeek =>
  class WrappedWithChangeSort extends Component {
    state = { sorting: 'totalPoints' }

    changeSort = (sorting) => {
      LayoutAnimation.configureNext(linear)
      this.setState(state => ({ ...state, sorting }))
    }

    render() {
      const { sorting } = this.state
      return <WrappedWeek sorting={sorting} changeSort={this.changeSort} {...this.props} />
    }
  }

const WeekView = ({
  currentUserId,
  eventId,
  eventIndex,
  sorting,
  season,
  reversedEventIds,
  changeWeek,
  changeSort
}) => [
  <WeekPicker
    key={`weekPicker_${season.id}`}
    weeks={reversedEventIds}
    currentId={eventId}
    onChangeWeek={changeWeek}
  />,
  eventId === 'final' ? (
    <FinalWeek key={`finalWeek_${eventId}`} season={season} />
  ) : (
    <EventView
      key={`eventView_${eventId}`}
      seasonId={season.id}
      currentUserId={currentUserId}
      sorting={sorting}
      eventId={eventId}
      eventIndex={eventIndex}
      showSorter={eventId !== 'final' && parseInt(season.name, 10) > 2015}
      changeSort={changeSort}
    />
  )
]

WeekView.propTypes = {
  currentUserId: string,
  eventId: string.isRequired,
  eventIndex: string.isRequired,
  sorting: string.isRequired,
  season: seasonShape.isRequired,
  reversedEventIds: arrayOf(shape({
    id: string.isRequired,
    index: string.isRequired
  }).isRequired).isRequired,
  changeWeek: func.isRequired,
  changeSort: func.isRequired
}

export default withChangeSort(WeekView)
