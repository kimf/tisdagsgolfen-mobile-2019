import React from 'react'
import { View, FlatList } from 'react-native'
import { arrayOf, shape, func } from 'prop-types'

import EventSetupPlayingCard from '../Scoring/EventSetupPlayingCard'
import TopButton from '../shared/TopButton'
import styles from '../../styles'

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

SetupIndividualEvent.propTypes = {
  playing: arrayOf(shape()),
  openAddPlayer: func.isRequired,
  onRemove: func.isRequired,
  onChangeStrokes: func.isRequired
}

SetupIndividualEvent.defaultProps = {
  playing: []
}

export default SetupIndividualEvent
