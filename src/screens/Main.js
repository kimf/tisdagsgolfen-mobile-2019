import React, { Component } from 'react'
import { View } from 'react-native'
import { LogView } from 'react-native-device-log'

import { withMainQuery } from 'queries/mainQuery'

import Season from 'Season/Season'
import SeasonPicker from 'Season/SeasonPicker'
import BottomButton from 'shared/BottomButton'

const { arrayOf, bool, func, shape, string } = React.PropTypes

class Main extends Component {
  static navigationOptions = {
    header: () => ({
      visible: false
    })
  }

  static propTypes = {
    data: shape({
      user: shape({
        id: string.isRequired,
        scoringSession: shape({
          id: string.isRequired,
          event: shape({
            course: shape({
              name: string.isRequired
            })
          })
        })
      }),
      seasons: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired
      })),
      loading: bool
    }),
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

  render() {
    if (this.props.data.loading) {
      return null
    }

    const { data, navigation } = this.props
    const { showSeasonPicker, showLog } = this.state
    const activeEvent = data.user.scoringSession
    const smallerSeasons = data.seasons.map(s => ({ id: s.id, name: s.name }))
    const currentSeasonId = this.state.currentSeasonId || smallerSeasons[0].id

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
            currentSeasonId={currentSeasonId}
            onChangeSeason={s => this.changeSeason(s)}
          />
          : null
        }

        <Season
          key={`season_${currentSeasonId}`}
          seasons={data.seasons}
          currentSeasonId={currentSeasonId}
          currentUserId={data.user.id}
          navigation={navigation}
          toggleSeasonpicker={this.toggleSeasonpicker}
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
