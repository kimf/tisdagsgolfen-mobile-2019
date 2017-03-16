// TODO: Refactor and dry this up!
import React, { Component, PropTypes } from 'react'
import { Alert, ActivityIndicator, View, Picker } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import TGText from 'shared/TGText'
import PendingSuccessOrErrorText from 'Scoring/PendingSuccessOrErrorText'
import { pointsArray, STROKE_VALUES, PUTT_VALUES, BEER_VALUES } from 'Scoring/constants'

const calculateExtraStrokes = (holeIndex, playerStrokes, holesCount) => {
  let extra = 0
  if (holeIndex <= playerStrokes) {
    extra = 1
    if (playerStrokes > holesCount) {
      if (holeIndex <= (playerStrokes - holesCount)) {
        extra = 2
      }
    }
  }
  return extra
}

const { bool, shape, number, string, func } = PropTypes

class ScoreRow extends Component {
  static propTypes = {
    teamEvent: bool.isRequired,
    player: shape().isRequired,
    hole: shape().isRequired,
    holesCount: number.isRequired,
    eventId: string.isRequired,
    createLiveScore: func.isRequired,
    updateLiveScore: func.isRequired
  }

  constructor(props) {
    super(props)
    const { hole, player, holesCount } = props
    const liveScore = hole.liveScores.find(ls => ls.user.id === player.id)

    const scoreItem = liveScore ? { ...liveScore, isSaved: true } : {
      strokes: hole.par,
      putts: 2,
      points: 0,
      beers: 0,
      extraStrokes: calculateExtraStrokes(hole.index, player.strokes, holesCount),
      isSaved: false
    }

    this.state = { scoring: false, scoreItem }
  }

  onValueChange = (key, value) => {
    const scoreItem = this.state.scoreItem
    scoreItem[key] = value
    this.setState({ scoreItem })
  }

  onCloseScoreForm = () => {
    const { player, hole, eventId, createLiveScore, updateLiveScore } = this.props
    const { strokes, putts, extraStrokes } = this.state.scoreItem
    const newScoreItem = { ...this.state.scoreItem }

    if (strokes - putts <= 0) {
      Alert.alert('Du verkar ha angett fler puttar än slag!')
    } else {
      const strokeSum = strokes - extraStrokes
      const testSum = strokeSum - hole.par
      newScoreItem.points = parseInt(pointsArray[testSum], 10)
      newScoreItem.inFlight = true
      this.setState({ scoring: false, scoreItem: newScoreItem })

      let promise = null
      if (newScoreItem.id) {
        promise = () => updateLiveScore(newScoreItem)
      } else {
        promise = () => createLiveScore(eventId, player.id, hole.id, newScoreItem)
      }

      promise().then(() => {
        newScoreItem.inFlight = false
        newScoreItem.isSaved = true
        this.setState({ scoreItem: newScoreItem })
      }).catch((error) => {
        newScoreItem.inFlight = false
        newScoreItem.failedToSave = true
        this.setState({ scoreItem: newScoreItem })
        // eslint-disable-next-line no-console
        console.log('there was an error sending the query', error)
      })
    }
  }

  toggleScoreForm = () => {
    this.setState({ scoring: !this.state.scoring })
  }

  render() {
    const { player, hole, teamEvent } = this.props
    const { scoring, scoreItem } = this.state

    const playerName = `${player.firstName} ${player.lastName}`

    let extraStrokesDots = ''
    for (let i = 0; i < scoreItem.extraStrokes; i += 1) {
      extraStrokesDots += '•'
    }

    if (scoring) {
      const putsPicker = teamEvent ? null : (
        <Picker
          style={{ flex: 1 }}
          selectedValue={scoreItem.putts}
          onValueChange={putts => this.onValueChange('putts', putts)}
        >
          {PUTT_VALUES.map(val => (
            <Picker.Item
              key={val}
              value={val}
              label={`${val} puttar`}
            />
          ))}
        </Picker>
      )

      const beersPicker = teamEvent ? null : (
        <Picker
          style={{ flex: 1 }}
          selectedValue={scoreItem.beers}
          onValueChange={beers => this.onValueChange('beers', beers)}
        >
          {BEER_VALUES.map(val => (
            <Picker.Item
              key={val}
              value={val}
              label={`${val} öl`}
            />
          ))}
        </Picker>
      )

      return (
        <View>
          <TGText style={{ width: '100%', padding: 10, textAlign: 'center', fontWeight: 'bold', backgroundColor: '#eee' }}>{playerName}</TGText>
          <View style={{ flexDirection: 'row' }}>
            {beersPicker}
            <Picker
              style={{ flex: 1 }}
              selectedValue={scoreItem.strokes}
              onValueChange={strokes => this.onValueChange('strokes', strokes)}
            >
              {STROKE_VALUES.map(val => (
                <Picker.Item
                  key={val}
                  value={val}
                  label={`${val} slag`}
                />
              ))}
            </Picker>
            {putsPicker}
          </View>
          <TGText
            viewStyle={{ padding: 10, width: '100%', backgroundColor: 'green' }}
            style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
            onPress={this.onCloseScoreForm}
          >
            SPARA SCORE
      </TGText>
        </View>
      )
    }

    let playerNames = null
    if (teamEvent) {
      playerNames = player.players.map(p => (
        <TGText key={`team_player_name_${p.id}`}>
          {p.name}
        </TGText>
      ))
    }

    return (
      <View
        style={{ paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' }}
        key={`scoreRowDeluxe_${hole.id}_${player.id}`}
      >
        <View style={{ flex: 2, flexDirection: 'row' }}>
          {scoreItem.inFlight ? <ActivityIndicator color="green" style={{ marginRight: 5 }} /> : null}
          <TGText onPress={!scoreItem.inFlight && this.toggleScoreForm}>
            {teamEvent ? `Lag ${player.id + 1}` : playerName}
          </TGText>
          <TGText style={{ marginLeft: 5 }}>{extraStrokesDots}</TGText>
          <TGText>{playerNames}</TGText>
        </View>
        {teamEvent ? null : <PendingSuccessOrErrorText scoreItem={scoreItem} item="beers" />}
        <PendingSuccessOrErrorText scoreItem={scoreItem} item="strokes" />
        {teamEvent ? null : <PendingSuccessOrErrorText scoreItem={scoreItem} item="putts" />}
        <PendingSuccessOrErrorText scoreItem={scoreItem} item="points" />
      </View>
    )
  }
}

const createLiveScoreMutation = gql`
  mutation createLiveScore(
    $eventId: ID!,
    $userId: ID!,
    $holeId: ID!,
    $extraStrokes: Int!,
    $strokes:Int!,
    $putts:Int!,
    $points:Int!,
    $beers:Int!
  ) {
    createLiveScore(
      eventId:$eventId,
      userId:$userId,
      holeId:$holeId,
      extraStrokes:$extraStrokes,
      strokes:$strokes,
      putts:$putts,
      points:$points,
      beers:$beers
    ) {
      id
    }
  }
`

const updateLiveScoreMutation = gql`
  mutation updateLiveScore(
    $id: ID!,
    $extraStrokes: Int!,
    $strokes:Int!,
    $putts:Int!,
    $points:Int!,
    $beers:Int!
  ) {
    updateLiveScore(
      id:$id,
      extraStrokes:$extraStrokes,
      strokes:$strokes,
      putts:$putts,
      points:$points,
      beers:$beers
    ) {
      id
    }
  }
`

const WithCreateMutation = graphql(createLiveScoreMutation, {
  props: ({ mutate }) => ({
    createLiveScore: (eventId, userId, holeId, scoreItem) => (
      mutate({ variables: { eventId, userId, holeId, ...scoreItem } })
    )
  })
})(ScoreRow)

export default graphql(updateLiveScoreMutation, {
  props: ({ mutate }) => ({
    updateLiveScore: scoreItem => mutate({ variables: { ...scoreItem } })
  })
})(WithCreateMutation)
