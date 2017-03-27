import React, { Component, PropTypes } from 'react'
import { View, ScrollView } from 'react-native'
import update from 'immutability-helper'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import TopButton from 'shared/TopButton'
import BottomButton from 'shared/BottomButton'
import styles from 'styles'

import { withScoringSessionMutation } from 'mutations/scoringSessionMutation'
import { eventShape, userShape } from 'propTypes'

const { shape, func } = PropTypes

class SetupIndividualEvent extends Component {
  static navigationOptions = {
    title: 'Starta runda',
    tabBar: () => ({ visible: false })
  }

  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          event: eventShape.isRequired
        })
      })
    }).isRequired,
    currentUser: userShape.isRequired,
    createScoringSession: func.isRequired
  }

  constructor(props) {
    super(props)
    const user = props.currentUser
    this.state = {
      playing: [{ ...user, strokes: 0 }]
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
      const { currentUser, createScoringSession, navigation } = this.props
      const scoringPlayers = this.state.playing.map(p => (
        { extraStrokes: p.strokes, userId: p.id }
      ))
      const event = navigation.state.params.event
      const res = await createScoringSession(
        event.id, event.course.id, currentUser.id, scoringPlayers
      )

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'ScoreEvent',
            params: { scoringSessionId: res.data.createScoringSession.id }
          })
        ]
      })
      navigation.dispatch(resetAction)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  openAddPlayer = () => {
    this.props.navigation.navigate('NewPlayer', {
      event: this.props.navigation.state.params.event,
      onAdd: this.onAddPlayer,
      addedIds: this.state.playing.map(p => p.id)
    })
  }

  render() {
    const { playing } = this.state

    return (
      <View style={styles.container}>
        <TopButton title="+ LÄGG TILL SPELARE" onPress={this.openAddPlayer} />
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

        <BottomButton title="STARTA RUNDA" onPress={this.startPlay} />
      </View>
    )
  }
}

const mapStateToProps = state => ({ currentUser: state.app.currentUser })

export default compose(
  connect(mapStateToProps),
  withScoringSessionMutation
)(SetupIndividualEvent)
