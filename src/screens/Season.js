import React, { Component } from 'react'
import { View } from 'react-native'
import { func, shape } from 'prop-types'

import BottomButton from 'shared/BottomButton'
import SeasonHeader from 'Season/SeasonHeader'
import SeasonPicker from 'Season/SeasonPicker'
import WeekView from 'Season/WeekView'

import { screenPropsShape } from 'propTypes'
import styles from 'styles'

class Season extends Component {
  static navigationOptions = {
    header: null
  }

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

        <WeekView season={season} currentUser={currentUser} />

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
