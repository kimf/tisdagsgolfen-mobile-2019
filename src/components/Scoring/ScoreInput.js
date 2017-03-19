import React, { Component, PropTypes } from 'react'
import { Alert, View, Picker } from 'react-native'
import { compose } from 'react-apollo'

import TGText from 'shared/TGText'
import { pointsArray, STROKE_VALUES, PUTT_VALUES, BEER_VALUES } from 'Scoring/constants'
import { withCreateLiveScoreMutation } from 'mutations/createLiveScoreMutation'
import { withUpdateLiveScoreMutation } from 'mutations/updateLiveScoreMutation'

const { bool, shape, number, string, func, oneOfType } = PropTypes

class ScoreInput extends Component {
  static propTypes = {
    itemName: string.isRequired,
    holeId: string.isRequired,
    eventId: string.isRequired,
    playerId: string.isRequired,
    scoringSessionId: string.isRequired,
    par: number.isRequired,
    teamEvent: bool.isRequired,
    scoreItem: oneOfType([
      bool,
      shape({
        beers: number.isRequired,
        strokes: number.isRequired,
        putts: number.isRequired,
        extraStrokes: number.isRequired
      })
    ]).isRequired,
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
    const {
      holeId, par, teamEvent, eventId, playerId, scoringSessionId, createLiveScore, updateLiveScore
    } = this.props
    const { extraStrokes } = this.props.scoreItem
    const { beers, strokes, putts } = this.state
    const newScoreItem = { ...this.props.scoreItem, beers, strokes, putts }

    const playingId = teamEvent ? { scoringTeamId: playerId } : { scoringPlayerId: playerId }
    const ids = { eventId, holeId, scoringSessionId, ...playingId }

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
            await createLiveScore(ids, newScoreItem)
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
    const { teamEvent, itemName } = this.props

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
      <View>
        <View style={{ backgroundColor: 'white' }}>
          <TGText style={{ width: '100%', padding: 10, textAlign: 'center', fontWeight: 'bold', backgroundColor: '#eee' }}>{itemName}</TGText>
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

export default compose(
  withCreateLiveScoreMutation,
  withUpdateLiveScoreMutation
)(ScoreInput)
