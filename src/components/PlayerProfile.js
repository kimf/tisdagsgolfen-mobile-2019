import React from 'react'
import { View, Text } from 'react-native'
import styles from '../styles';

const PlayerProfile = ({player}) => {
  return (
   <View style={styles.container}>
      <Text>{player.firstName} {player.lastName}</Text>
   </View>
  )
}

export default PlayerProfile
