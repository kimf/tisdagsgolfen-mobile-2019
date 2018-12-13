import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import { linear } from '../../animations'
import EventView from './EventView'
import FinalWeek from './FinalWeek'
import WeekPicker from './WeekPicker'
const withChangeSort = WrappedWeek =>
  class WrappedWithChangeSort extends Component {
    public state = { sorting: 'totalPoints' }
    public changeSort = sorting => {
      LayoutAnimation.configureNext(linear)
      this.setState(state => ({ ...state, sorting }))
    }
    public render() {
      const { sorting } = this.state
      return <WrappedWeek sorting={sorting} changeSort={this.changeSort} {...this.props} />
    }
  }
interface WeekViewProps {
  currentUserId?: any
  eventId: any
  eventIndex: any
  sorting: any
  season: any
  reversedEventIds: string[]
  changeWeek: any
  changeSort: any
}
const WeekView: React.SFC<WeekViewProps> = ({
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
export default withChangeSort(WeekView)
