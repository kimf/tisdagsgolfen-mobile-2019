import React, { Component, PropTypes } from 'react'
import { Alert, View, PickerIOS } from 'react-native'

import TGText from 'shared/TGText'

const STROKE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const PUTT_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const BEER_VALUES = [0, 1, 2, 3, 4, 5]
const pointsArray = []
pointsArray[-8] = 10
pointsArray[-7] = 9
pointsArray[-6] = 8
pointsArray[-5] = 7
pointsArray[-4] = 6
pointsArray[-3] = 5
pointsArray[-2] = 4
pointsArray[-1] = 3
pointsArray[0] = 2
pointsArray[1] = 1
pointsArray[2] = 0
pointsArray[3] = 0
pointsArray[4] = 0
pointsArray[5] = 0
pointsArray[6] = 0
pointsArray[7] = 0
pointsArray[8] = 0
pointsArray[9] = 0
pointsArray[10] = 0


export default class ScoringScreen extends Component {
  static propTypes = {
    eventScore: PropTypes.shape({
      strokes: PropTypes.number,
      putts: PropTypes.number
    }),
    teamEvent: PropTypes.bool.isRequired,
    closeScoreForm: PropTypes.func.isRequired,
    player: PropTypes.shape().isRequired,
    par: PropTypes.number.isRequired,
    extraStrokes: PropTypes.number.isRequired
  }

  static defaultProps = {
    eventScore: null
  }

  constructor(props) {
    super(props)
    this.state = {
      strokes: props.par,
      putts: (props.teamEvent ? 0 : 2)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      strokes: nextProps.eventScore.strokes || this.props.par,
      putts: nextProps.eventScore.putts || (this.props.teamEvent ? 0 : 2)
    }
  }

  onCloseScoreForm = () => {
    const { par, closeScoreForm, extraStrokes } = this.props
    const { strokes, putts } = this.state

    if (strokes - putts <= 0) {
      Alert.alert('Du verkar ha angett fler puttar än slag!')
    } else {
      const strokeSum = strokes - extraStrokes
      const testSum = strokeSum - par

      const points = parseInt(pointsArray[testSum], 10)
      closeScoreForm(strokes, putts, points)
    }
  }


  render() {
    const { player, teamEvent } = this.props
    const playerName = `${player.firstName} ${player.lastName}`

    const putsPicker = teamEvent ? null : (
      <PickerIOS
        style={{ flex: 1 }}
        selectedValue={this.state.putts}
        onValueChange={putts => this.setState({ putts })}
      >
        {PUTT_VALUES.map(val => (
          <PickerIOS.Item
            key={val}
            value={val}
            label={`${val} puttar`}
          />
        ))}
      </PickerIOS>
    )

    return (
      <View>
        <TGText style={{ width: '100%', padding: 10, textAlign: 'center', fontWeight: 'bold', backgroundColor: '#eee' }}>{playerName}</TGText>
        <View style={{ flexDirection: 'row' }}>
          <PickerIOS
            style={{ flex: 1 }}
            selectedValue={this.state.strokes}
            onValueChange={strokes => this.setState({ strokes })}
          >
            {STROKE_VALUES.map(val => (
              <PickerIOS.Item
                key={val}
                value={val}
                label={`${val} slag`}
              />
            ))}
          </PickerIOS>
          {putsPicker}
        </View>
        <TGText
          viewStyle={{ padding: 10, width: '100%', backgroundColor: 'green' }}
          style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
          onPress={() => this.onCloseScoreForm()}
        >
          SPARA SCORE
      </TGText>
      </View>
    )
  }
}
