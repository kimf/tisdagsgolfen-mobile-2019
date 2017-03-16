import React, { Component, PropTypes } from 'react'
import { Alert, View, Picker } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'immutability-helper'

import TGText from 'shared/TGText'
import { pointsArray, STROKE_VALUES, PUTT_VALUES, BEER_VALUES } from 'Scoring/constants'

const { bool, shape, number, string, func } = PropTypes

class ScoreInput extends Component {
  static propTypes = {
    playerId: string.isRequired,
    playerName: string.isRequired,
    holeId: string.isRequired,
    eventId: string.isRequired,
    par: number.isRequired,
    teamEvent: bool.isRequired,
    scoreItem: shape({
      beers: number.isRequired,
      strokes: number.isRequired,
      putts: number.isRequired,
      extraStrokes: number.isRequired
    }).isRequired,
    createLiveScore: func.isRequired,
    updateLiveScore: func.isRequired,
    onClose: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      beers: props.scoreItem.beers || 0,
      strokes: props.scoreItem.strokes || props.par,
      putts: props.scoreItem.putts || 2
    }
  }

  state = { beers: null, strokes: null, putts: null }

  onCloseScoreForm = () => {
    const { playerId, holeId, par, eventId, createLiveScore, updateLiveScore } = this.props
    const { extraStrokes } = this.props.scoreItem
    const { beers, strokes, putts } = this.state
    const newScoreItem = { ...this.props.scoreItem, beers, strokes, putts }

    if (putts > strokes) {
      Alert.alert('Du verkar ha angett fler puttar än slag!')
    } else {
      const strokeSum = strokes - extraStrokes
      const testSum = strokeSum - par
      newScoreItem.points = parseInt(pointsArray[testSum], 10)
      newScoreItem.inFlight = true

      const save = async () => {
        try {
          if (newScoreItem.id) {
            await updateLiveScore(newScoreItem)
          } else {
            await createLiveScore(eventId, playerId, holeId, newScoreItem)
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err)
        }

        this.props.onClose()
      }

      save()
    }
  }

  render() {
    const { teamEvent, playerName } = this.props
    const putsPicker = teamEvent ? null : (
      <Picker
        style={{ flex: 1 }}
        selectedValue={this.state.putts}
        onValueChange={putts => this.setState({ putts })}
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
        selectedValue={this.state.beers}
        onValueChange={beers => this.setState({ beers })}
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
      <View
        style={{
          paddingHorizontal: 40,
          paddingTop: '25%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100%',
          height: 2000,
          backgroundColor: 'rgba(0, 0, 0, 0.85)'
        }}
      >
        <View style={{ backgroundColor: 'white' }}>
          <TGText style={{ width: '100%', padding: 10, textAlign: 'center', fontWeight: 'bold', backgroundColor: '#eee' }}>{playerName}</TGText>
          <View style={{ flexDirection: 'row' }}>
            {beersPicker}
            <Picker
              style={{ flex: 1 }}
              selectedValue={this.state.strokes}
              onValueChange={strokes => this.setState({ strokes })}
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
      extraStrokes
      strokes
      putts
      points
      beers
      user {
        id
      }
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
      extraStrokes
      strokes
      putts
      points
      beers
      user {
        id
      }
    }
  }
`
/*
client.mutate({
  mutation: TodoCreateMutation,
  variables: {
    text,
  },
  update: (proxy, { data: { createTodo } }) => {
    // Read the data from our cache for this query.
    const data = proxy.readQuery({ query: TodoAppQuery });
    // Add our todo from the mutation to the end.
    data.todos.push(createTodo);
    // Write our data back to the cache.
    proxy.writeQuery({ query: TodoAppQuery, data });
  },
});
*/

const WithCreateMutation = graphql(createLiveScoreMutation, {
  props: ({ mutate }) => ({
    createLiveScore: (eventId, userId, holeId, scoreItem) => (
      mutate({
        variables: { eventId, userId, holeId, ...scoreItem },
        updateQueries: {
          scoringHoles: (prev, { mutationResult }) => {
            const holeIndex = prev.holes.findIndex(h => h.id === holeId)
            const newLs = mutationResult.data.createLiveScore
            return update(prev, {
              holes: {
                [holeIndex]: {
                  liveScores: { $push: [newLs] }
                }
              }
            })
          }
        }
      })
    )
  })
})(ScoreInput)

export default graphql(updateLiveScoreMutation, {
  props: ({ mutate }) => ({
    updateLiveScore: scoreItem => mutate({ variables: { ...scoreItem } })
  })
})(WithCreateMutation)
