import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { LogView } from 'react-native-device-log'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import { seasonShape, userShape } from 'propTypes'
import { withLeaderboardQuery, leaderboardQueryProps } from 'queries/leaderboardQuery'
import { changeSeason } from 'actions/app'
import { spring } from 'animations'

import LeaderboardContent from 'Leaderboard/LeaderboardContent'
import SeasonPicker from 'Leaderboard/SeasonPicker'
import BottomButton from 'shared/BottomButton'

const { arrayOf, func, shape } = React.PropTypes

class Leaderboard extends Component {
  static navigationOptions = {
    tabBar: () => ({
      label: 'Ledartavla',
      icon: ({ tintColor }) => (
        <Image
          source={require('../images/trophy-filled.png')}
          style={{ tintColor, height: 22, width: 22 }}
        />
      )
    })
  }

  static propTypes = {
    currentSeason: seasonShape.isRequired,
    currentUser: userShape.isRequired,
    seasons: arrayOf(seasonShape).isRequired,
    activeScoringSession: shape(),
    data: leaderboardQueryProps,
    onChangeSeason: func.isRequired,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  static defaultProps = {
    data: {
      user: null,
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
    this.props.onChangeSeason(seasonId)
    this.toggleSeasonpicker()
  }

  toggleLog = () => {
    this.setState(state => ({ ...state, showLog: !this.state.showLog }))
  }

  toggleSeasonpicker = () => {
    this.setState(state => ({ ...state, showSeasonPicker: !state.showSeasonPicker }))
  }

  showActiveScoringSession = () => {
    const scoringSessionId = this.props.activeScoringSession.id
    this.props.navigation.navigate('ScoreEvent', { scoringSessionId })
  }

  render() {
    if (this.props.data.loading) {
      return null
    }
    const {
      data, currentSeason, currentUser, seasons, activeScoringSession, navigation
    } = this.props
    const { showLog, showSeasonPicker } = this.state

    if (showLog) {
      return (
        <LogView
          style={{ flex: 1 }}
          inverted={false}
          timeStampFormat="HH:mm:ss"
          multiExpanded
        />
      )
    }

    return (
      <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: '#eee' }}>
        {
          showSeasonPicker
            ? <SeasonPicker
              seasons={seasons}
              currentSeasonId={currentSeason.id}
              onChangeSeason={this.onChangeSeason}
            />
            : null
        }

        <LeaderboardContent
          key={`season_${currentSeason.id}`}
          season={currentSeason}
          players={data.players}
          currentUserId={currentUser.id}
          navigation={navigation}
          toggleSeasonpicker={this.toggleSeasonpicker}
        />

        {activeScoringSession
          ? <BottomButton
            title={`FORTSÄTT AKTIV RUNDA PÅ ${activeScoringSession.event.course.name.toUpperCase()}`}
            onPress={this.showActiveScoringSession}
          />
          : null
        }
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onChangeSeason: seasonId => dispatch(changeSeason(seasonId))
})

const mapStateToProps = state => ({
  currentSeason: state.app.currentSeason,
  currentUser: state.app.currentUser,
  seasons: state.app.seasons,
  activeScoringSession: state.app.activeScoringSession,
  seasonId: state.app.currentSeason.id
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLeaderboardQuery
)(Leaderboard)