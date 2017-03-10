import React from 'react'
import { View, Text } from 'react-native'

import styles from 'styles'

const NewPlayer = () => (
  <View style={styles.container}>
    <View style={{ flex: 1 }}>
      <Text>Lägg till ny spelare</Text>
    </View>
  </View>
)

export default NewPlayer
