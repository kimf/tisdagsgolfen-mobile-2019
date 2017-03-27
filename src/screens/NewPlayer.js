import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'

import TGText from 'shared/TGText'
import styles from 'styles'
import { withUserQuery } from 'queries/userQuery'
import { userShape } from 'propTypes'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const { shape, bool, arrayOf, func, string, number } = PropTypes

class NewPlayer extends Component {
  static navigationOptions = {
    title: 'Lägg till spelare',
    tabBar: () => ({ visible: false })
  }

  static propTypes = {
    data: shape({
      loading: bool,
      players: arrayOf(userShape)
    }),
    navigation: shape({
      state: shape({
        params: shape({
          team: shape({
            id: number.isRequired
          }),
          addedIds: arrayOf(string).isRequired,
          onAdd: func.isRequired
        })
      }).isRequired
    }).isRequired
  }

  static defaultProps = {
    team: null,
    data: {
      loading: true,
      players: []
    }
  }


  addPlayer = (player, team = null) => {
    this.props.navigation.state.params.onAdd(player, team)
    this.props.navigation.goBack()
  }

  render() {
    const { data } = this.props
    const { team, addedIds } = this.props.navigation.state.params
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
