import React, { Component } from 'react'
import { View, Animated, Easing, LayoutAnimation } from 'react-native'
import { func, shape } from 'prop-types'

import SeasonHeader from 'Season/SeasonHeader'
import SeasonPicker from 'Season/SeasonPicker'
import WeekView from 'Season/WeekView'

import EmptyState from 'shared/EmptyState'
import { screenPropsShape } from 'propTypes'
import styles, { deviceHeight } from 'styles'
import { linear } from 'animations'

const TOP = -deviceHeight
const BOTTOM = 0

// TODO, break out this into smaller pieces
class Season extends Component {
  static navigationOptions = {
    headerBackTitle: 'Tisdagsgolfen',
    header: () => {}
  }

  static propTypes = {
    screenProps: screenPropsShape.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  state = {
    seasonId: null,
    eventId: null
  }

  onChangeSeason = (seasonId) => {
    this.setState(state => ({
      ...state,
      seasonId,
      eventId: null
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

  gotoPlay = () => {
    const { screenProps: { isLoggedIn } } = this.props
    if (isLoggedIn) {
      this.props.navigation.navigate('CoursePickerScreen')
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  changeWeek = (eventId) => {
    LayoutAnimation.configureNext(linear)
    this.setState(state => ({ ...state, eventId }))
  }

  render() {
    const { screenProps: { currentUser, activeScoringSession, seasons } } = this.props
    const { seasonId } = this.state

    const season = seasonId ? seasons.find(s => s.id === seasonId) : seasons[0]
    const currentUserId = currentUser ? currentUser.id : null
    const hasEvents = season.eventIds.length > 0

    let weekProps
    if (hasEvents) {
      const reversedEventIds = [...season.eventIds, season.closed ? 'final' : null]
        .map((id, index) => ({ id: `${id}`, index: `${index + 1}` }))
        .reverse()

      const eventId = this.state.eventId || reversedEventIds[0].id
      const eventIndex = reversedEventIds.find(id => id.id === eventId).index

      weekProps = {
        currentUserId,
        eventId,
        eventIndex,
        season,
        reversedEventIds
      }
    }

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

        <SeasonHeader
          season={season}
          togglePicker={() => this.toggleSeasonpicker(!this.open)}
          goPlay={activeScoringSession ? this.showActiveScoringSession : this.gotoPlay}
          activeScoringSession={activeScoringSession}
        />

        {hasEvents ? (
          <WeekView {...weekProps} changeWeek={this.changeWeek} />
        ) : (
          <EmptyState text="Inga spelade rundor ännu" />
        )}
      </View>
    )
  }
}

export default Season
