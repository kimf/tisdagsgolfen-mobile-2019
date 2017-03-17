import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import update from 'immutability-helper'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import TGText from 'shared/TGText'

import { withScoringSessionMutation } from 'mutations/scoringSessionMutation'

const { bool, shape, string, func } = PropTypes

class SetupIndividualEvent extends Component {
  static propTypes = {
    event: shape({
      id: string.isRequired,
      scoringType: string.isRequired,
      status: string.isRequired,
      teamEvent: bool.isRequired,
      club: string,
      course: shape({
        id: string,
        club: string,
        name: string
      })
    }).isRequired,
    user: shape({
      id: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired
    }).isRequired,
    navigator: shape().isRequired,
    createScoringSession: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      playing: [{ ...props.user, strokes: 0 }]
    }
  }

  onAddPlayer = (player) => {
    const playing = [
      ...this.state.playing,
      { ...player, strokes: 0 }
    ]
    this.setState({ playing })
  }

  onRemove = (player) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, { $splice: [[playingIndex, 1]] })
    this.setState({ playing })
  }

  onChangeStrokes = (player, strokes) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(
      this.state.playing,
      { [playingIndex]: { strokes: { $set: strokes } } }
    )
    this.setState({ playing })
  }

  startPlay = async () => {
    try {
      const { event, user, createScoringSession } = this.props
      const scoringPlayers = this.state.playing.map(p => (
        { extraStrokes: p.strokes, userId: p.id }
      ))
      const res = await createScoringSession(event.id, event.course.id, user.id, scoringPlayers)
      this.props.navigator.showModal({
        screen: 'tisdagsgolfen.ScoreEvent',
        title: 'Scoring...',
        passProps: { scoringSessionId: res.data.createScoringSession.id },
        animated: true
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  openAddPlayer = () => {
    this.props.navigator.showModal({
      screen: 'tisdagsgolfen.NewPlayer',
      title: 'Lägg till spelare',
      passProps: {
        event: this.props.event,
        onAdd: this.onAddPlayer,
        addedIds: this.state.playing.map(p => p.id)
      }
    })
  }

  render() {
    const { playing } = this.state

    return (
      <View style={{ flex: 1 }}>
        <TGText
          viewStyle={{ width: '100%', padding: 10, backgroundColor: '#ccc' }}
          style={{ fontSize: 12, fontWeight: 'bold', color: '#888', textAlign: 'center' }}
          onPress={this.openAddPlayer}
        >
          + LÄGG TILL SPELARE
        </TGText>
        <ScrollView>
          {playing.map((pl) => {
            const props = {
              onRemove: this.onRemove,
              onChangeStrokes: this.onChangeStrokes,
              teamEvent: false
            }
            return <EventSetupPlayingCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
          })}
        </ScrollView>
        <TGText
          viewStyle={{ width: '100%', paddingVertical: 10, backgroundColor: 'green' }}
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

export default compose(
  connect(mapStateToProps),
  withScoringSessionMutation
)(SetupIndividualEvent)
