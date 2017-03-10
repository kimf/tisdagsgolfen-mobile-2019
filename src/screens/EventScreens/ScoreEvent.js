import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity, ListView } from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import styles from 'styles'
import LinkButton from 'shared/LinkButton'
import TGText from 'shared/TGText'

import { cancelEvent, removePlayerFromEvent } from '../../reducers/event'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
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
        title: 'Ny spelare',
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
        navigator.push({
          screen: 'tisdagsgolfen.NewPlayer',
          title: 'Lägg till spelare'
        })
      }
    }
  }

  askForStrokes = (player) => {
    this.props.navigator.push({
      screen: 'tisdagsgolfen.PlayerStrokes',
      passProps: { player },
      title: `Ange slag för ${player.firstName}`
    })
  }

  render() {
    const { playing, event, data, onRemovePlayer } = this.props
    if (data.loading || !event) {
      return null
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            padding: 20,
            backgroundColor: '#eee'
          }}
        >
          { playing.map(player => (
            <View key={`setup_player_row_${player.id}`} style={styles.listrow}>
              <Text style={styles.flexOne}>
                {player.firstName} {player.lastName}
              </Text>
              <TouchableOpacity
                key={`setup_player_row_${player.id}`}
                onPress={() => this.askForStrokes(player)}
              >
                <Text style={styles.strokeInfo}>Extraslag: {player.strokes}</Text>
              </TouchableOpacity>
              <TGText onPress={() => onRemovePlayer(player)}>Ta bort</TGText>
            </View>
          ))}
        </View>
        <View style={[styles.inlineHeader, { paddingVertical: 10 }]}>
          <Text style={[styles.centerText, { fontWeight: 'bold' }]}>Välj spelare</Text>
        </View>
        <ListView
          ref={(c) => { this.listView = c }}
          initialListSize={100}
          dataSource={ds.cloneWithRows(data.players)}
          renderRow={(player) => {
            const isPlaying = playing.find(p => p.id === player.id)
            return !isPlaying ? (
              <TouchableOpacity
                key={`setup_player_row_${player.id}`}
                style={styles.listrow}
                onPress={() => this.askForStrokes(player)}
              >
                <Text style={styles.flexOne}>
                  {player.firstName} {player.lastName}
                </Text>
              </TouchableOpacity>
            ) : null
          }}
          enableEmptySections
        />

        <LinkButton onPress={() => {}} title="Starta runda" />
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
  data: shape({
    loading: bool.isRequired,
    players: arrayOf(shape())
  }).isRequired
}

ScoreEvent.defaultProps = {
  event: null
}


const userQuery = gql`
  query getAllUsers {
    players: allUsers (
      orderBy: firstName_ASC
    ) {
      id
      email
      firstName
      lastName
    }
  }
`

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
    }
  }
)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(userQuery)
)(ScoreEvent)
