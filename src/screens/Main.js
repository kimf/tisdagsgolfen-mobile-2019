import React, { Component } from 'react'
import { View } from 'react-native'
import { LogView } from 'react-native-device-log'

import { withMainQuery, mainQueryProps } from 'queries/mainQuery'

import Season from 'Season/Season'
import SeasonPicker from 'Season/SeasonPicker'
import BottomButton from 'shared/BottomButton'

const { func, shape } = React.PropTypes

class Main extends Component {
  static navigationOptions = {
    header: () => ({
      visible: false
    })
  }

  static propTypes = {
    data: mainQueryProps,
    navigation: shape({
      navigate: func.isRequired
    }).isRequired
  }

  static defaultProps = {
    data: {
      user: null,
      loading: true,
      seasons: []
    }
  }

  state = {
    currentSeasonId: null,
    showSeasonPicker: false,
    showLog: false
  }

  toggleSeasonpicker = () => {
    this.setState(state => ({ ...state, showSeasonPicker: !state.showSeasonPicker }))
  }

  changeSeason = (currentSeasonId) => {
    this.setState(state => ({ ...state, currentSeasonId, showSeasonPicker: false }))
  }

  toggleLog = () => {
    this.setState(state => ({ ...state, showLog: !this.state.showLog }))
  }

  showActiveEvent = () => {
    const scoringSessionId = this.props.data.user.scoringSession.id
    this.props.navigation.navigate('ScoreEvent', { scoringSessionId })
  }

  gotoProfile = () => {
    const { id, email, firstName, lastName } = this.props.data.user
    this.props.navigation.navigate('Profile', { user: { id, email, firstName, lastName } })
  }

  gotoEvents = () => {
    const { id, email, firstName, lastName } = this.props.data.user
    const currentSeason = this.currentSeason()
    this.props.navigation.navigate('Events', {
      user: { id, email, firstName, lastName },
      seasonId: currentSeason.id,
      seasonClosed: currentSeason.closed
    })
  }

  // TODO: Memoize
  currentSeason = () => {
    const currentSeasonId = this.state.currentSeasonId || this.props.data.seasons[0].id
    return this.props.data.seasons.find(s => s.id === currentSeasonId)
  }

  render() {
    if (this.props.data.loading) {
      return null
    }

    const { data, navigation } = this.props
    const { showSeasonPicker, showLog } = this.state
    const activeEvent = data.user.scoringSession
    const smallerSeasons = data.seasons.map(s => ({ id: s.id, name: s.name }))
    const currentSeason = this.currentSeason()

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
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        {showSeasonPicker
          ? <SeasonPicker
            seasons={smallerSeasons}
            currentSeasonId={currentSeason.id}
            onChangeSeason={s => this.changeSeason(s)}
          />
          : null
        }

        <Season
          key={`season_${currentSeason.id}`}
          season={currentSeason}
          currentUserId={data.user.id}
          navigation={navigation}
          toggleSeasonpicker={this.toggleSeasonpicker}
          gotoProfile={this.gotoProfile}
          gotoEvents={this.gotoEvents}
        />

        {activeEvent
          ? <BottomButton
            title={`FORTSÄTT AKTIV RUNDA PÅ ${activeEvent.event.course.name.toUpperCase()}`}
            onPress={this.showActiveEvent}
          />
          : null
        }
      </View>
    )
  }
}

export default withMainQuery(Main)
