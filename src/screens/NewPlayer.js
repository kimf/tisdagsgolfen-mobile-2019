import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import TGText from 'shared/TGText'
import styles from 'styles'
import { addPlayerToEvent } from 'reducers/event'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class NewPlayer extends Component {
  static navigatorStyle = {
    navBarTextColor: 'white',
    navBarBackgroundColor: '#1E98DF'
  }

  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Avbryt',
        id: 'cancel'
      }
    ]
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal()
      }
    }
  }

  addPlayer = (player) => {
    this.props.onAddPlayerToEvent(player, 0)
    this.props.navigator.dismissModal()
  }


  render() {
    const { data, playing } = this.props
    if (data.loading) { return null }
    return (
      <View style={styles.container}>
        <ListView
          ref={(c) => { this.listView = c }}
          initialListSize={100}
          dataSource={ds.cloneWithRows(data.players)}
          renderRow={(player) => {
            const isPlaying = playing.find(p => p.id === player.id)
            return !isPlaying ? (
              <TGText
                key={`setup_player_row_${player.id}`}
                onPress={() => this.addPlayer(player)}
                viewStyle={styles.listrow}
              >
                {player.firstName} {player.lastName}
              </TGText>
            ) : null
          }}
          enableEmptySections
        />
      </View>
    )
  }
}

const { shape, string, bool, arrayOf, func } = PropTypes
NewPlayer.propTypes = {
  data: shape({
    loading: bool.isRequired,
    players: arrayOf(shape())
  }).isRequired,
  playing: arrayOf(
    shape({
      id: string.isRequired
    }).isRequired
  ).isRequired,
  onAddPlayerToEvent: func.isRequired,
  navigator: shape().isRequired
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
    onAddPlayerToEvent: (player, strokes) => {
      dispatch(addPlayerToEvent(player, strokes))
    }
  }
)


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(userQuery)
)(NewPlayer)
