import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import update from 'immutability-helper'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import TGText from 'shared/TGText'

const { bool, shape, string } = PropTypes

class SetupTeamEvent extends Component {
  static propTypes = {
    event: shape({
      id: string.isRequired,
      scoringType: string.isRequired,
      status: string.isRequired,
      teamEvent: bool.isRequired,
      course: shape({
        club: string,
        name: string
      })
    }).isRequired,
    user: shape({
      id: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired
    }).isRequired,
    navigator: shape().isRequired
  }

  constructor(props) {
    super(props)

    const playing = [
      {
        id: 0,
        players: [props.user],
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
    this.props.navigator.showModal({
      screen: 'tisdagsgolfen.NewPlayer',
      title: `Lägg till i Lag ${team.id + 1}`,
      passProps: {
        team,
        event: this.props.event,
        onAdd: this.onAddPlayer,
        addedIds: [].concat(...this.state.playing.map(t => t.players)).map(p => p.id)
      }
    })
  }

  startPlay = () => {
    // TODO: Save a ScoringSession here and then...->
    this.props.navigator.showModal({
      screen: 'tisdagsgolfen.ScoreEvent',
      title: 'Scoring...',
      passProps: {},
      animated: true,
      navigatorStyle: {}, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    })
  }

  render() {
    const { playing } = this.state

    return (
      <View style={{ flex: 1 }}>
        <TGText
          viewStyle={{ width: '100%', padding: 10, backgroundColor: '#ccc' }}
          style={{ fontSize: 12, fontWeight: 'bold', color: '#888', textAlign: 'center' }}
          onPress={this.onAddTeam}
        >
          + LÄGG TILL LAG
        </TGText>
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
        <TGText
          viewStyle={{ alignSelf: 'center', width: '100%', paddingVertical: 10, backgroundColor: 'green' }}
          style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
          onPress={this.startPlay}
        >
          STARTA RUNDA
        </TGText>
      </View>
    )
  }
}

const mapStateToProps = state => ({ user: state.app.user })

export default connect(mapStateToProps)(SetupTeamEvent)
