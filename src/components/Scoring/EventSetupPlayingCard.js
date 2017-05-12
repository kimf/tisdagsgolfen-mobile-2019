import React, { Component } from 'react'
import { View, Slider, Image } from 'react-native'
import { shape, func, bool } from 'prop-types'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

const defaultAvatar = require('../../images/defaultavatar.png')

class EventSetupPlayingCard extends Component {
  static propTypes = {
    item: shape().isRequired,
    onRemove: func.isRequired,
    onChangeStrokes: func.isRequired,
    onRemovePlayerFromTeam: func,
    onAddPlayerToTeam: func,
    teamEvent: bool.isRequired
  }

  static defaultProps = {
    onRemovePlayerFromTeam: () => { },
    onAddPlayerToTeam: () => { }
  }


  constructor(props) {
    super(props)
    this.state = { strokes: props.item.strokes }
  }

  state = { strokes: 0 }

  getPhotoUrl = item => (item.photo ? { uri: item.photo.url } : defaultAvatar)

  render() {
    const {
      item, onRemove, onChangeStrokes, onRemovePlayerFromTeam, onAddPlayerToTeam, teamEvent
    } = this.props

    const name = teamEvent ? `Lag ${item.id + 1}` : `${item.firstName} ${item.lastName}`
    const photoSrc = this.getPhotoUrl(item)

    return (
      <View
        style={{
          flexDirection: 'column',
          marginHorizontal: 10,
          marginVertical: 5,
          paddingVertical: 15,
          paddingHorizontal: 20,
          backgroundColor: colors.lightGray
        }}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          {teamEvent
            ? <View style={{ flex: 0, marginRight: 20, flexDirection: 'row' }}>
              {item.players.map(player => (
                <Image
                  key={`team_player_photo_${player.id}`}
                  style={styles.smallCardImage}
                  source={this.getPhotoUrl(player)}
                  resizeMode="cover"
                />
              ))}
            </View>
            : <Image
              style={styles.cardImage}
              source={photoSrc}
              resizeMode="cover"
            />
          }
          <TGText style={{ flex: 1, fontWeight: 'bold', fontSize: 18 }}>{name}</TGText>
          <TGText style={{ flex: 1, color: colors.red }} onPress={() => onRemove(item)}>
            Ta bort {teamEvent ? 'lag' : 'spelare'}
          </TGText>
        </View>
        <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', paddingVertical: 10 }}>
          <TGText style={{ flex: 0, textAlign: 'left' }}>Extraslag</TGText>
          <Slider
            style={{ flex: 1, marginHorizontal: 20 }}
            maximumValue={36}
            step={1}
            value={this.state.strokes}
            onSlidingComplete={val => onChangeStrokes(item, val)}
            onValueChange={strokes => this.setState({ strokes })}
          />
          <TGText style={{ flex: 0, textAlign: 'right', fontSize: 20, fontWeight: 'bold', color: colors.green }}>
            {this.state.strokes}
          </TGText>
        </View>
        {teamEvent
          ? <View
            style={{
              paddingVertical: 10,
              borderTopWidth: 1,
              borderColor: colors.white,
              flexDirection: 'column'
            }}
          >
            {item.players.map(player => (
              <View key={`pl_team_player_${player.id}`} style={{ width: '100%', paddingVertical: 5, flexDirection: 'row' }}>
                <TGText
                  style={{ flex: 1, color: colors.red, marginRight: 10 }}
                  onPress={() => onRemovePlayerFromTeam(item, player)}
                >
                  X
                </TGText>
                <TGText style={{ flex: 1, fontWeight: 'bold', fontSize: 14 }}>
                  {player.firstName} {player.lastName}
                </TGText>
              </View>
            ))}
            <TGText
              viewStyle={{
                marginTop: 10,
                padding: 10,
                backgroundColor: colors.muted
              }}
              style={{ textAlign: 'center', color: colors.white, fontSize: 12, fontWeight: 'bold' }}
              onPress={() => onAddPlayerToTeam(item)}
            >
              + Lägg till spelare i {name}
            </TGText>
          </View>
          : null
        }
      </View>
    )
  }
}

export default EventSetupPlayingCard
