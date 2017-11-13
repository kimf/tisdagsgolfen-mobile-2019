import React, { Component } from 'react'
import { View, Animated, Easing, LayoutAnimation } from 'react-native'
import { func, shape } from 'prop-types'

import BottomButton from 'shared/BottomButton'
import SeasonHeader from 'Season/SeasonHeader'
import SeasonPicker from 'Season/SeasonPicker'
import WeekPicker from 'Season/WeekPicker'
import EventView from 'Season/EventView'
import FinalWeek from 'Season/FinalWeek'
import Sorter from 'Season/Sorter'
import TGText from 'shared/TGText'
import { screenPropsShape } from 'propTypes'
import styles, { colors, deviceHeight } from 'styles'
import { linear } from 'animations'

const TOP = -deviceHeight
const BOTTOM = 0

// TODO, break out this into smaller pieces
class Season extends Component {
  static propTypes = {
    screenProps: screenPropsShape.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  state = {
    seasonId: null,
    eventId: null,
    sorting: 'totalPoints'
  }

  onChangeSeason = (seasonId) => {
    this.setState(state => ({
      ...state,
      seasonId,
      eventId: null,
      sorting: 'totalPoints'
    }))
    this.toggleSeasonpicker(false)
  }

  seasonPickerPos = new Animated.Value(0)
  open = false

  toggleSeasonpicker = (open) => {
    this.open = open
    Animated.timing(this.seasonPickerPos, {
      toValue: open ? TOP : BOTTOM,
      easing: Easing.ease,
      duration: 450,
      useNativeDriver: true
    }).start()
  }

  showActiveScoringSession = () => {
    const scoringSessionId = this.props.screenProps.activeScoringSession.id
    this.props.navigation.navigate('ScoreEvent', { scoringSessionId })
  }

  changeWeek = (eventId) => {
    LayoutAnimation.configureNext(linear)
    this.setState(state => ({ ...state, eventId }))
  }

  changeSort = (sorting) => {
    LayoutAnimation.configureNext(linear)
    this.setState(state => ({ ...state, sorting }))
  }

  render() {
    const { screenProps: { currentUser, activeScoringSession, seasons } } = this.props
    const { seasonId, sorting } = this.state

    const season = seasonId ? seasons.find(s => s.id === seasonId) : seasons[0]
    const currentUserId = currentUser ? currentUser.id : null
    const eventCount = season.eventIds.length
    const reversedEventIds = [...season.eventIds, season.closed ? 'final' : null]
      .map((id, index) => ({ id: `${id}`, index: `${index + 1}` }))
      .reverse()

    const eventId = this.state.eventId || reversedEventIds[1].id
    const eventIndex = reversedEventIds.find(id => id.id === eventId).index

    const seasonPickerPos = this.seasonPickerPos.interpolate({
      inputRange: [TOP, BOTTOM],
      outputRange: [BOTTOM, TOP],
      extrapolate: 'clamp'
    })

    return (
      <View style={styles.container}>
        <SeasonPicker
          seasons={seasons}
          onChangeSeason={this.onChangeSeason}
          position={seasonPickerPos}
        />
        {activeScoringSession && (
          <BottomButton
            title={`FORTSÄTT AKTIV RUNDA PÅ ${activeScoringSession.course.name.toUpperCase()}`}
            onPress={this.showActiveScoringSession}
          />
        )}

        <SeasonHeader season={season} togglePicker={() => this.toggleSeasonpicker(!this.open)} />

        {eventId !== 'final' && (
          <View
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
              <Sorter
                key="weekSortTabs"
                current={sorting}
                onChange={sort => this.changeSort(sort)}
              />
            )}
          </View>
        )}

        {eventId === 'final' ? (
          <FinalWeek season={season} />
        ) : (
          <EventView
            seasonId={season.id}
            currentUserId={currentUserId}
            sorting={sorting}
            eventId={eventId}
          />
        )}

        <WeekPicker
          key={`weekPicker_${seasonId}`}
          weeks={reversedEventIds}
          currentId={eventId}
          onChangeWeek={this.changeWeek}
        />
      </View>
    )
  }
}

export default Season
