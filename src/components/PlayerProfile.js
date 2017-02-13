import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles'

const PlayerProfile = ({ player }) =>
  <View style={styles.container}>
    <Text>{player.firstName} {player.lastName}</Text>
  </View>


const { shape, string } = React.PropTypes

PlayerProfile.propTypes = {
  player: shape({
    firstName: string.isRequired,
    lastName: string.isRequired
  }).isRequired
}

export default PlayerProfile
