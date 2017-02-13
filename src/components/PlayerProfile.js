import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'

const PlayerProfile = ({ player }) =>
  <View style={styles.container}>
    <Text>{player.firstName} {player.lastName}</Text>
  </View>

PlayerProfile.propTypes = {
  player: React.PropTypes.shape.isRequired
}

export default PlayerProfile
