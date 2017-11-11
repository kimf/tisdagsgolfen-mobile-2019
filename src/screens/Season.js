import React, { Component } from 'react'
import { View } from 'react-native'
import { func, shape } from 'prop-types'
import { StackNavigator } from 'react-navigation'

import FinalWeek from 'Season/FinalWeek'
import WeekView from 'Season/WeekView'

import BottomButton from 'shared/BottomButton'
import SeasonHeader from 'Season/SeasonHeader'
import SeasonPicker from 'Season/SeasonPicker'
import { screenPropsShape } from 'propTypes'
import styles from 'styles'

class Season extends Component {
  static propTypes = {
    screenProps: screenPropsShape.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  state = {
    seasonId: null,
    showSeasonPicker: false
  }

  onChangeSeason = (seasonId) => {
    this.setState(state => ({ ...state, seasonId }))
    this.toggleSeasonpicker()
  }

  toggleSeasonpicker = () => {
    this.setState(state => ({ ...state, showSeasonPicker: !state.showSeasonPicker }))
  }

  showActiveScoringSession = () => {
    const scoringSessionId = this.props.screenProps.activeScoringSession.id
    this.props.navigation.navigate('ScoreEvent', { scoringSessionId })
  }

  render() {
    const { screenProps: { currentUser, activeScoringSession, seasons } } = this.props
    const { showSeasonPicker, seasonId } = this.state

    const season = seasonId ? seasons.find(s => s.id === seasonId) : seasons[0]

    const SeasonNavigator = season.closed
      ? StackNavigator(
        {
          Final: { screen: FinalWeek },
          Week: { screen: WeekView }
        },
        { headerMode: 'none' }
      )
      : StackNavigator({ Week: { screen: WeekView } }, { headerMode: 'none' })
    // TODO: Should be able to just render WeekView here!

    this.router = SeasonNavigator.router
    return (
      <View style={styles.container}>
        {showSeasonPicker && (
          <SeasonPicker
            seasons={seasons}
            onChangeSeason={this.onChangeSeason}
            onClose={this.toggleSeasonpicker}
          />
        )}
        <SeasonHeader season={season} togglePicker={this.toggleSeasonpicker} />

        <SeasonNavigator screenProps={{ season, currentUser }} />

        {activeScoringSession && (
          <BottomButton
            title={`FORTSÄTT AKTIV RUNDA PÅ ${activeScoringSession.course.name.toUpperCase()}`}
            onPress={this.showActiveScoringSession}
          />
        )}
      </View>
    )
  }
}

export default Season
