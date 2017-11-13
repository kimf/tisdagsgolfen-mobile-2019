import React from 'react'
import { View } from 'react-native'
import { arrayOf, string, shape, func } from 'prop-types'

import WeekPicker from 'Season/WeekPicker'
import EventView from 'Season/EventView'
import FinalWeek from 'Season/FinalWeek'
import Sorter from 'Season/Sorter'
import TGText from 'shared/TGText'
import { seasonShape } from 'propTypes'
import { colors } from 'styles'

const WeekView = ({
  currentUserId,
  eventId,
  eventIndex,
  sorting,
  season,
  reversedEventIds,
  changeWeek
}) => [
  eventId !== 'final' && (
    <View
      key={`weekView_${eventId}`}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.darkGreen
      }}
    >
      <TGText style={{ flex: 1, color: 'white', fontWeight: 'bold' }}>
        Efter {eventIndex} {eventIndex > 1 ? 'omgångar' : 'omgång'}
      </TGText>
      {parseInt(season.name, 10) > 2015 && (
        <Sorter key="weekSortTabs" current={sorting} onChange={sort => this.changeSort(sort)} />
      )}
    </View>
  ),

  eventId === 'final' ? (
    <FinalWeek key={`finalWeek_${eventId}`} season={season} />
  ) : (
    <EventView
      key={`eventView_${eventId}`}
      seasonId={season.id}
      currentUserId={currentUserId}
      sorting={sorting}
      eventId={eventId}
    />
  ),

  <WeekPicker
    key={`weekPicker_${season.id}`}
    weeks={reversedEventIds}
    currentId={eventId}
    onChangeWeek={changeWeek}
  />
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
  changeWeek: func.isRequired
}

export default WeekView
