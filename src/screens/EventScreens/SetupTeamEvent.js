import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { shape, func } from 'prop-types'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import BottomButton from 'shared/BottomButton'
import TopButton from 'shared/TopButton'
import { colors } from 'styles'
import { eventShape, userShape } from 'propTypes'
import { withScoringSessionMutation } from 'mutations/scoringSessionMutation'

class SetupTeamEvent extends Component {
  static navigationOptions = {
    title: 'Starta runda',
    tabBarVisible: false
  }

  static propTypes = {
    currentUser: userShape.isRequired,
    createScoringSession: func.isRequired,
    navigation: shape({
      state: shape({
        params: shape({
          event: eventShape.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)

    const playing = [
      {
        id: 0,
        players: [props.currentUser],
        strokes: 0
      }
    ]

    this.state = { playing }
  }

  onRemove = (team) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(this.state.playing, { $splice: [[playingIndex, 1]] })
    this.setState({ playing })
  }

  onAddTeam = () => {
    const oldPlaying = this.state.playing
    const newItem = {
      id: oldPlaying.length,
      players: [],
      strokes: 0
    }
    const playing = oldPlaying.concat(newItem)
    this.setState({ playing })
  }

  onAddPlayer = (player, team) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(
      this.state.playing,
      { [teamIndex]: { players: { $push: [player] } } }
    )

    this.setState({ playing })
  }

  onChangeStrokes = (team, strokes) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(
      this.state.playing,
      { [playingIndex]: { strokes: { $set: strokes } } }
    )

    this.setState({ playing })
  }

  onRemovePlayerFromTeam = (team, player) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playerIndex = this.state.playing[teamIndex].players.findIndex(p => p.id === player.id)
    const playing = update(
      this.state.playing, {
        [teamIndex]: {
          players: { $splice: [[playerIndex, 1]] }
        }
      }
    )
    this.setState({ playing })
  }

  openAddPlayer = (team) => {
    this.props.navigation.navigate('NewPlayer', {
      team,
      event: this.props.navigation.state.params.event,
      onAdd: this.onAddPlayer,
      addedIds: [].concat(...this.state.playing.map(t => t.players)).map(p => p.id),
      title: `Lägg till i Lag ${team.id + 1}`
    })
  }

  startPlay = async () => {
    try {
      const { currentUser, createScoringSession, navigation } = this.props

      const scoringTeams = this.state.playing.map(team => (
        { extraStrokes: team.strokes, usersIds: team.players.map(p => p.id) })
      )

      const event = navigation.state.params.event
      const res = await createScoringSession(
        event.id, event.course.id, currentUser.id, null, scoringTeams
      )
      navigation.navigate('ScoreEvent', { scoringSessionId: res.data.createScoringSession.id })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  render() {
    const { playing } = this.state

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <TopButton title="+ LÄGG TILL LAG" onPress={this.onAddTeam} />
        <ScrollView>
          {playing.map((team) => {
            const props = {
              onRemove: this.onRemove,
              onChangeStrokes: this.onChangeStrokes,
              onRemovePlayerFromTeam: this.onRemovePlayerFromTeam,
              onAddPlayerToTeam: () => this.openAddPlayer(team),
              teamEvent: true
            }
            return <EventSetupPlayingCard key={`setup_team_${team.id}`} item={team} {...props} />
          })}
        </ScrollView>
        <BottomButton title="STARTA RUNDA" onPress={this.startPlay} />
      </View>
    )
  }
}

const mapStateToProps = state => ({ currentUser: state.app.currentUser })

export default compose(
  connect(mapStateToProps),
  withScoringSessionMutation
)(SetupTeamEvent)
