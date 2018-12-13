import React from 'react'
import { FlatList, View } from 'react-native'

import styles from '../../styles'
import EventSetupPlayingCard from '../Scoring/EventSetupPlayingCard'
import TopButton from '../shared/TopButton'

const SetupIndividualEvent = ({ openAddPlayer, playing, onRemove, onChangeStrokes }) => (
  <View style={styles.container}>
    <TopButton title="+ LÄGG TILL SPELARE" onPress={() => openAddPlayer()} />
    <FlatList
      data={playing}
      renderItem={({ item }) => (
        <EventSetupPlayingCard
          item={item}
          {...{
            onRemove,
            onChangeStrokes,
            teamEvent: false
          }}
        />
      )}
      keyExtractor={item => `setup_pl_${item.id}`}
    />
  </View>
)

export default SetupIndividualEvent
