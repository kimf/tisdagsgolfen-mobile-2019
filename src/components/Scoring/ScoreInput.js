import React, { Component } from 'react'
import { Alert, View, Picker } from 'react-native'
import { bool, shape, number, string, func, oneOfType } from 'prop-types'
import { compose } from 'react-apollo'

import TopButton from 'shared/TopButton'
import { pointsArray, STROKE_VALUES, PUTT_VALUES, BEER_VALUES } from 'Scoring/constants'
import { withCreateLiveScoreMutation } from 'mutations/createLiveScoreMutation'
import { withUpdateLiveScoreMutation } from 'mutations/updateLiveScoreMutation'
import { colors } from 'styles'

class ScoreInput extends Component {
  static propTypes = {
    holeNr: number.isRequired,
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
      par,
      teamEvent,
      playerId,
      scoringSessionId,
      createLiveScore,
      updateLiveScore,
      holeNr,
      scoreItem
    } = this.props

    const { extraStrokes } = scoreItem
    const { beers, strokes, putts } = this.state
    const newScoreItem = {
      points: scoreItem.points,
      extraStrokes,
      hole: holeNr,
      beers,
      strokes,
      putts,
      par
    }

    const ids = {
      scoringSessionId,
      userId: teamEvent ? null : playerId,
      teamIndex: teamEvent ? playerId : null
    }

    if (putts > strokes) {
      Alert.alert('Du verkar ha angett fler puttar än slag!')
    } else {
      const strokeSum = strokes - extraStrokes
      const testSum = strokeSum - par
      newScoreItem.points = parseInt(pointsArray[testSum], 10)

      const save = async () => {
        try {
          if (scoreItem.id) {
            await updateLiveScore(scoreItem.id, newScoreItem)
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
    const { teamEvent } = this.props

    const putsPicker = teamEvent ? null : (
      <Picker
        style={{ flex: 1 }}
        selectedValue={this.state.putts}
        onValueChange={putts => this.setState({ putts })}
      >
        {PUTT_VALUES.map(val => <Picker.Item key={val} value={val} label={`${val} puttar`} />)}
      </Picker>
    )

    const beersPicker = teamEvent ? null : (
      <Picker
        style={{ flex: 1 }}
        selectedValue={this.state.beers}
        onValueChange={beers => this.setState({ beers })}
      >
        {BEER_VALUES.map(val => <Picker.Item key={val} value={val} label={`${val} öl`} />)}
      </Picker>
    )

    return (
      <View style={{ backgroundColor: colors.white }}>
        <View style={{ flexDirection: 'row' }}>
          {beersPicker}
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.strokes}
            onValueChange={strokes => this.setState({ strokes })}
          >
            {STROKE_VALUES.map(val => <Picker.Item key={val} value={val} label={`${val} slag`} />)}
          </Picker>
          {putsPicker}
        </View>
        <TopButton title="SPARA" onPress={this.onCloseScoreForm} />
      </View>
    )
  }
}

export default compose(withCreateLiveScoreMutation, withUpdateLiveScoreMutation)(ScoreInput)
