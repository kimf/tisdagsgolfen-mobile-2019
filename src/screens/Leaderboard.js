import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { LogView } from 'react-native-device-log'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import { seasonShape, userShape } from 'propTypes'
import { withLeaderboardQuery, leaderboardQueryProps } from 'queries/leaderboardQuery'
import { changeSeason } from 'actions/app'
import { colors } from 'styles'

import LeaderboardContent from 'Leaderboard/LeaderboardContent'
import SeasonPicker from 'Leaderboard/SeasonPicker'
import BottomButton from 'shared/BottomButton'

const { arrayOf, func, shape } = React.PropTypes

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
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'ScoreEvent', params: { scoringSessionId } })
      ]
    })
    this.props.navigation.dispatch(resetAction)
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
      <View style={{ flex: 1, alignItems: 'stretch', backgroundColor: colors.lightGray }}>
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

const mapDispatchToProps = dp => ({
  onChangeSeason: seasonId => dp(changeSeason(seasonId))
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
