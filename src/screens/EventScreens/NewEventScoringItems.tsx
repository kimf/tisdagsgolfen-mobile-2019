import update from 'immutability-helper'
import React, { Component } from 'react'
import { View } from 'react-native'
import SetupIndividualEvent from '../../components/Events/SetupIndividualEvent'
import SetupTeamEvent from '../../components/Events/SetupTeamEvent'
import BottomButton from '../../components/shared/BottomButton'
import TGText from '../../components/shared/TGText'
import { withCreateScoringSessionMutation } from '../../graph/mutations/scoringSessionMutation'
import styles, { colors } from '../../styles'

interface NewEventScoringItemsProps {
  screenProps: any
  navigation: {
    state: {
      params?: {
        course: {
          id: any
          club: any
          name: any
        }
        isStrokes: any
        teamEvent: any
      }
    }
    navigate: any
    goBack: any
  }
}
interface NewEventScoringItemsState {
  error: boolean
  playing: any[]
  isStrokes: any
  teamEvent: any
}
class NewEventScoringItems extends Component<NewEventScoringItemsProps, NewEventScoringItemsState> {
  public static navigationOptions = {
    title: 'Spelare'
  }
  constructor(props) {
    super(props)
    const user = props.screenProps.currentUser
    const { teamEvent, isStrokes } = props.navigation.state.params
    let playing = [{ ...user, strokes: 5 }]
    if (teamEvent) {
      playing = [
        {
          id: 0,
          players: [user],
          strokes: 10
        }
      ]
    }
    this.state = {
      error: false,
      playing,
      isStrokes,
      teamEvent
    }
  }
  public onAddTeam = () => {
    const oldPlaying = this.state.playing
    const newItem = {
      id: oldPlaying.length,
      players: [],
      strokes: 0
    }
    const playing = oldPlaying.concat(newItem)
    this.setState({ playing })
  }
  public onAddPlayerToTeam = (player, team) => {
    const teamIndex = this.state.playing.findIndex(p => p.id === team.id)
    const playing = update(this.state.playing, {
      [teamIndex]: { players: { $push: [player] } }
    })
    this.setState({ playing })
  }
  public onRemovePlayerFromTeam = (team, player) => {
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
  public onAddPlayer = player => {
    const playing = [...this.state.playing, { ...player, strokes: 0 }]
    this.setState({ playing })
  }
  public onRemove = player => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, {
      $splice: [[playingIndex, 1]]
    })
    this.setState({ playing })
  }
  public onChangeStrokes = (player, strokes) => {
    const playingIndex = this.state.playing.findIndex(p => p.id === player.id)
    const playing = update(this.state.playing, {
      [playingIndex]: { strokes: { $set: strokes } }
    })
    this.setState({ playing })
  }
  public startPlay = async () => {
    try {
      const {
        screenProps: { currentUser },
        createScoringSession,
        navigation
      } = this.props
      const {
        state: {
          params: { course }
        }
      } = navigation
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
      navigation.navigate('ScoreEvent', {
        scoringSessionId: res.data.createScoringSession.id
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
  public openAddPlayer = (team = null) => {
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
  public render() {
    const { navigation } = this.props
    const {
      state: {
        params: { teamEvent }
      }
    } = navigation
    const { playing, error } = this.state
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
          }}>
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
          {showError}
          {teamEvent ? <SetupTeamEvent {...passProps} /> : <SetupIndividualEvent {...passProps} />}
        </View>
        <View style={{ padding: 10, backgroundColor: colors.lightGray }}>
          <BottomButton title="STARTA RUNDA" onPress={this.startPlay} />
        </View>
      </View>
    )
  }
}
export default withCreateScoringSessionMutation(NewEventScoringItems)
