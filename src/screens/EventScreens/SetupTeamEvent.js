import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { shape } from 'prop-types'
import update from 'immutability-helper'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import BottomButton from 'shared/BottomButton'
import TopButton from 'shared/TopButton'
import { colors } from 'styles'
import { eventShape, userShape } from 'propTypes'

class SetupTeamEvent extends Component {
  static navigationOptions = {
    title: 'Starta runda',
    tabBarVisible: false
  }

  static propTypes = {
    currentUser: userShape.isRequired,
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

  startPlay = () => {
    // TODO: Save a ScoringSession here and then...->
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
  connect(mapStateToProps)
)(SetupTeamEvent)
