import React, { Component } from 'react'
import { Switch, View, StyleSheet } from 'react-native'
import { string, shape, func } from 'prop-types'
import update from 'immutability-helper'
// import moment from 'moment'
// import 'moment/locale/sv'
import SetupIndividualEvent from 'Events/SetupIndividualEvent'
import SetupTeamEvent from 'Events/SetupTeamEvent'
import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import styles, { colors } from 'styles'
import { withCreateScoringSessionMutation } from 'mutations/scoringSessionMutation'
import { userShape } from 'propTypes'

class NewEventSetup extends Component {
  static propTypes = {
    course: shape({
      id: string.isRequired,
      club: string.isRequired,
      name: string.isRequired
    }).isRequired,
    changeCourse: func.isRequired,
    navigation: shape().isRequired,
    currentUser: userShape.isRequired
  }

  constructor(props) {
    super(props)
    const user = props.currentUser
    this.state = {
      playing: [{ ...user, strokes: 0 }],
      isStrokes: false,
      teamEvent: false,
      error: false
    }
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

  onAddPlayerToTeam = (player, team) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(this.state.playing, { [teamIndex]: { players: { $push: [player] } } })

    this.setState({ playing })
  }

  onRemovePlayerFromTeam = (team, player) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playerIndex = this.state.playing[teamIndex].players.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, {
      [teamIndex]: {
        players: { $splice: [[playerIndex, 1]] }
      }
    })
    this.setState({ playing })
    this.updatePlaying(playing)
  }

  onAddPlayer = (player) => {
    const playing = [...this.state.playing, { ...player, strokes: 0 }]
    this.setState({ playing })
  }

  onRemove = (player) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, { $splice: [[playingIndex, 1]] })
    this.setState({ playing })
  }

  onChangeStrokes = (player, strokes) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, { [playingIndex]: { strokes: { $set: strokes } } })
    this.setState({ playing })
  }

  changeEventType = (teamEvent) => {
    const user = this.props.currentUser
    let playing = [{ ...user, strokes: 0 }]
    if (teamEvent) {
      playing = [
        {
          id: 0,
          players: [user],
          strokes: 0
        }
      ]
    }
    this.setState({ teamEvent, playing })
  }

  startPlay = async () => {
    try {
      const {
        currentUser, course, createScoringSession, navigation
      } = this.props
      const { teamEvent, isStrokes } = this.state
      const scoringItems = this.state.playing.map(playing => ({
        extraStrokes: parseInt(playing.strokes, 10),
        userIds: teamEvent ? playing.players.map(p => p.id) : [playing.id]
      }))

      const scoringType = isStrokes ? 'strokes' : 'points'

      const res = await createScoringSession(
        course.id,
        currentUser.id,
        teamEvent,
        scoringType,
        scoringItems
      )
      navigation.navigate('ScoreEvent', { scoringSessionId: res.data.createScoringSession.id })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }

  openAddPlayer = (team = null) => {
    if (team) {
      this.props.navigation.navigate('NewPlayer', {
        team,
        onAdd: this.onAddPlayerToTeam,
        addedIds: [].concat(...this.state.playing.map(t => t.players)).map(p => p.id),
        title: `Lägg till i Lag ${team.id + 1}`
      })
    } else {
      this.props.navigation.navigate('NewPlayer', {
        onAdd: this.onAddPlayer,
        addedIds: this.state.playing.map(p => p.id)
      })
    }
  }

  render() {
    const { changeCourse, course } = this.props
    const {
      teamEvent, isStrokes, playing, error
    } = this.state
    let showError
    if (error) {
      showError = (
        <TGText
          style={{
            backgroundColor: colors.red,
            width: '100%',
            padding: 10,
            color: colors.white,
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Något gick fel med att spara, se över infon
        </TGText>
      )
    }

    const passProps = {
      playing,
      onRemove: this.onRemove,
      onChangeStrokes: this.onChangeStrokes,
      onRemovePlayerFromTeam: this.onRemovePlayerFromTeam,
      openAddPlayer: this.openAddPlayer,
      onAddTeam: this.onAddTeam
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={[styles.inlineHeader, { flexDirection: 'row' }]}>
            <TGText style={{ flex: 1, padding: 10, color: colors.white }}>
              {course.club}: {course.name}
            </TGText>
            <TGText
              style={{ flex: 1, padding: 10, textAlign: 'right' }}
              onPress={() => changeCourse(null)}
            >
              Byt
            </TGText>
          </View>

          {showError}

          <View style={[styles.formRow, { flexDirection: 'row' }]}>
            <View style={[styles.formColumn, { borderRightWidth: StyleSheet.hairlineWidth }]}>
              <TGText style={styles.label}>Lagtävling?</TGText>
              <Switch
                onValueChange={te => this.changeEventType(te)}
                style={styles.formColumnContent}
                value={teamEvent}
              />
            </View>
            <View style={styles.formColumn}>
              <TGText style={styles.label}>Slaggolf?</TGText>
              <Switch
                onValueChange={isS => this.setState({ isStrokes: isS })}
                style={styles.formColumnContent}
                value={isStrokes}
              />
            </View>
          </View>
          {teamEvent ? <SetupTeamEvent {...passProps} /> : <SetupIndividualEvent {...passProps} />}
          <BottomButton title="STARTA RUNDA" onPress={this.startPlay} />
        </View>
      </View>
    )
  }
}

export default withCreateScoringSessionMutation(NewEventSetup)
