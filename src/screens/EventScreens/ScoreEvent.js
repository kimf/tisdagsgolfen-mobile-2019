import React, { Component, PropTypes } from 'react'
import { View, Slider } from 'react-native'
import { connect } from 'react-redux'

import TGText from 'shared/TGText'

import {
  cancelEvent,
  removePlayerFromEvent,
  changePlayerStrokes
} from 'reducers/event'


// userId, seasonId
class ScoreEvent extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ],
    rightButtons: [
      {
        // eslint-disable-next-line import/no-unresolved
        icon: require('../../images/plus.png'),
        title: 'Spelare',
        id: 'addPlayer'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = { course: null }

  onNavigatorEvent = (event) => {
    const { navigator, onCancelEvent } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        onCancelEvent()
        navigator.dismissModal()
      }
      if (event.id === 'addPlayer') {
        navigator.showModal({
          screen: 'tisdagsgolfen.NewPlayer',
          title: 'Lägg till spelare'
        })
      }
    }
  }

  render() {
    const { playing, event, onRemovePlayer, onChangePlayerStrokes } = this.props
    if (!event) {
      return null
    }

    return (
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        { playing.map(player => (
          <View
            key={`setup_player_row_${player.id}`}
            style={{
              minHeight: 100,
              flexDirection: 'column',
              margin: 10,
              padding: 10,
              backgroundColor: '#fff',
              borderBottomWidth: 2,
              borderBottomColor: '#ccc'
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TGText style={{ flex: 1, fontWeight: 'bold', fontSize: 18 }}>{player.firstName} {player.lastName}</TGText>
              <TGText style={{ flex: 1, color: 'red' }} onPress={() => onRemovePlayer(player)}>Ta bort</TGText>
            </View>
            <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
              <TGText style={{ flex: 0, textAlign: 'left' }}>Extraslag</TGText>
              <Slider
                style={{ flex: 1, marginHorizontal: 20 }}
                maximumValue={36}
                step={1}
                value={player.strokes}
                onValueChange={val => onChangePlayerStrokes(player, val)}
              />
              <TGText style={{ flex: 0, textAlign: 'right', fontSize: 20, fontWeight: 'bold', color: 'green' }}>{player.strokes}</TGText>
            </View>
          </View>
        ))}
        <TGText
          viewStyle={{ alignSelf: 'center', position: 'absolute', bottom: 20, width: '90%', paddingVertical: 10, backgroundColor: 'green' }}
          style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
          onPress={() => {}}
        >
          STARTA RUNDA
        </TGText>
      </View>
    )
  }
}

const { arrayOf, bool, shape, string, func } = PropTypes

ScoreEvent.propTypes = {
  event: shape({
    id: string.isRequired,
    scoringType: string.isRequired,
    status: string.isRequired,
    teamEvent: bool.isRequired,
    club: string,
    course: string
  }),
  playing: arrayOf(shape()).isRequired,
  navigator: shape().isRequired,
  onCancelEvent: func.isRequired,
  onRemovePlayer: func.isRequired,
  onChangePlayerStrokes: func.isRequired
}

ScoreEvent.defaultProps = {
  event: null
}


const mapStateToProps = state => (
  {
    playing: state.event.playing,
    event: state.event.event
  }
)

const mapDispatchToProps = dispatch => (
  {
    onCancelEvent: () => {
      dispatch(cancelEvent())
    },
    onRemovePlayer: (player) => {
      dispatch(removePlayerFromEvent(player))
    },
    onChangePlayerStrokes: (player, strokes) => {
      dispatch(changePlayerStrokes(player, strokes))
    }
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(ScoreEvent)
