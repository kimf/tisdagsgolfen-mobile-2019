import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'

import TGText from 'shared/TGText'
import styles from 'styles'

import { withUserQuery } from 'queries/userQuery'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const { shape, bool, arrayOf, func, string, number } = PropTypes

class NewPlayer extends Component {
  static propTypes = {
    data: shape({
      loading: bool,
      players: arrayOf(
        shape({
          id: string.isRequired,
          firstName: string.isRequired,
          lastName: string.isRequired
        })
      )
    }),
    team: shape({
      id: number.isRequired
    }),
    addedIds: arrayOf(string).isRequired,
    onAdd: func.isRequired,
    navigator: shape().isRequired
  }

  static defaultProps = {
    team: null,
    data: {
      loading: true,
      players: []
    }
  }

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

  addPlayer = (player, team = null) => {
    this.props.onAdd(player, team)
    this.props.navigator.dismissModal()
  }

  render() {
    const { data, team, addedIds } = this.props
    if (data.loading) { return null }

    return (
      <View style={styles.container}>
        <ListView
          ref={(c) => { this.listView = c }}
          initialListSize={100}
          dataSource={ds.cloneWithRows(data.players)}
          renderRow={(player) => {
            const isPlaying = addedIds.includes(player.id)
            return !isPlaying ? (
              <TGText
                key={`setup_player_row_${player.id}`}
                onPress={() => this.addPlayer(player, team)}
                viewStyle={{
                  borderBottomWidth: 1,
                  borderColor: '#eee',
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 15
                }}
                style={{ fontSize: 18, fontWeight: 'bold' }}
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

export default withUserQuery(NewPlayer)
