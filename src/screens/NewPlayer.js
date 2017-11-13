import React, { Component } from 'react'
import { View, FlatList, Image } from 'react-native'
import { shape, bool, arrayOf, func, string, number } from 'prop-types'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'
import { withUserQuery } from 'queries/userQuery'
import { userShape } from 'propTypes'

const defaultAvatar = require('../images/defaultavatar.png')

class NewPlayer extends Component {
  static navigationOptions = {
    title: 'Lägg till spelare',
    tabBarVisible: false
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
    if (data.loading) {
      return null
    }

    return (
      <View style={styles.container}>
        <FlatList
          removeClippedSubviews={false}
          ref={(c) => {
            this.listView = c
          }}
          initialListSize={100}
          data={data.players}
          renderItem={({ player }) => {
            const isPlaying = addedIds.includes(player.id)
            const photoSrc = player.photo ? { uri: player.photo.url } : defaultAvatar
            return !isPlaying ? (
              <TGText
                key={`setup_player_row_${player.id}`}
                onPress={() => this.addPlayer(player, team)}
                viewStyle={{
                  borderBottomWidth: 1,
                  borderColor: colors.lightGray,
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 15
                }}
                style={{ fontSize: 18, fontWeight: 'bold' }}
              >
                <Image style={styles.cardImage} source={photoSrc} resizeMode="cover" />
                {player.firstName} {player.lastName}
              </TGText>
            ) : null
          }}
          keyExtractor={player => `setup_player_row_${player.id}`}
          enableEmptySections
        />
      </View>
    )
  }
}

export default withUserQuery(NewPlayer)
