import React, { Component, PropTypes } from 'react'
import { View, TextInput, Text } from 'react-native'
import { connect } from 'react-redux'

import { addPlayerToEvent, changePlayerStrokes } from '../../../reducers/event'
import LinkButton from '../../../components/Shared/LinkButton'

import styles from '../../../styles'

class PlayerStrokes extends Component {
  constructor(props) {
    super(props)
    this.state = { strokes: (props.player.strokes || 0), error: null }
  }

  confirm = () => {
    const { player, navigator, onAddPlayerToEvent, onChangePlayerStrokes } = this.props
    const strokes = parseInt(this.state.strokes, 10)

    if (strokes < 37) {
      if (player.strokes === undefined) {
        onAddPlayerToEvent(player, strokes)
      } else {
        onChangePlayerStrokes(player, strokes)
      }
      navigator.pop()
    } else {
      this.setState({ error: 'MAX 36 SLAG, SÅ DÅLIG ÄR HEN NOG INTE!' })
    }
  }

  render() {
    const { player } = this.props
    const { strokes } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Hur många extra-slag har {player.firstName}?</Text>
        <Text style={styles.label}>Max 36!</Text>
        <TextInput
          style={[styles.inputField, { marginVertical: 20, height: 100, fontSize: 100, textAlign: 'center' }]}
          autoCapitalize="none"
          keyboardType="numeric"
          maxLength={2}
          autoFocus
          selectTextOnFocus
          returnKeyType="done"
          onSubmitEditing={() => this.confirm()}
          onChangeText={val => this.setState({ strokes: val })}
          value={`${strokes}`}
        />
        <LinkButton title="SPARA" onPress={() => this.confirm()} />
      </View>
    )
  }
}

PlayerStrokes.propTypes = {
  player: PropTypes.shape().isRequired,
  navigator: PropTypes.shape().isRequired,
  onAddPlayerToEvent: PropTypes.func.isRequired,
  onChangePlayerStrokes: PropTypes.func.isRequired
}


const mapDispatchToProps = dispatch => (
  {
    onAddPlayerToEvent: (player, strokes) => {
      dispatch(addPlayerToEvent(player, strokes))
    },
    onChangePlayerStrokes: (player, strokes) => {
      dispatch(changePlayerStrokes(player, strokes))
    }
  }
)

export default connect(
  null,
  mapDispatchToProps
)(PlayerStrokes)
