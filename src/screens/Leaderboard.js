import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { func, shape } from 'prop-types'
import { LogView } from 'react-native-device-log'

import { seasonsQueryProps, withSeasonsQuery } from 'queries/seasonsQuery'
import { colors } from 'styles'

import LeaderboardContent from 'Leaderboard/LeaderboardContent'
import SeasonPicker from 'Leaderboard/SeasonPicker'
import BottomButton from 'shared/BottomButton'

class Leaderboard extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Ledartavla',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/trophy-filled.png')}
        style={{ tintColor, height: 22, width: 22 }}
      />
    )
  }

  static propTypes = {
    activeScoringSession: shape(),
    data: seasonsQueryProps,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      seasons: []
    },
    activeScoringSession: null
  }

  state = {
    showLog: false,
    showSeasonPicker: false
  }

  onChangeSeason = (seasonId) => {
    this.setState(state => ({ ...state, seasonId }))
    this.toggleSeasonpicker()
  }

  // toggleLog = () => {
  //   this.setState(state => ({ ...state, showLog: !this.state.showLog }))
  // }

  toggleSeasonpicker = () => {
    this.setState(state => ({ ...state, showSeasonPicker: !state.showSeasonPicker }))
  }

  showActiveScoringSession = () => {
    const scoringSessionId = this.props.activeScoringSession.id
    this.props.navigation.navigate('ScoreEvent', { scoringSessionId })
  }

  render() {
    const { data, activeScoringSession, navigation } = this.props
    const { showLog, showSeasonPicker, seasonId } = this.state
    if (data.loading) {
      return null
    }

    const currentSeason = seasonId ? data.seasons.find(s => s.id === seasonId) : data.seasons[0]

    if (showLog) {
      return (
        <LogView style={{ flex: 1 }} inverted={false} timeStampFormat="HH:mm:ss" multiExpanded />
      )
    }

    return (
      <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: colors.lightGray }}>
        {showSeasonPicker ? (
          <SeasonPicker
            seasons={data.seasons}
            currentSeasonId={currentSeason.id}
            onChangeSeason={this.onChangeSeason}
          />
        ) : null}

        <LeaderboardContent
          season={currentSeason}
          navigation={navigation}
          toggleSeasonpicker={this.toggleSeasonpicker}
        />

        {activeScoringSession ? (
          <BottomButton
            title={`FORTSÄTT AKTIV RUNDA PÅ ${activeScoringSession.course.name.toUpperCase()}`}
            onPress={this.showActiveScoringSession}
          />
        ) : null}
      </View>
    )
  }
}

export default withSeasonsQuery(Leaderboard)
