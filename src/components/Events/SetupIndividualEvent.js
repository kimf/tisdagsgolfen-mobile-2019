import React from 'react'
import { View, ScrollView } from 'react-native'
import { arrayOf, shape, func } from 'prop-types'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import TopButton from 'shared/TopButton'
import styles from 'styles'

const SetupIndividualEvent = ({ openAddPlayer, playing, onRemove, onChangeStrokes }) => (
  <View style={styles.container}>
    <TopButton title="+ LÄGG TILL SPELARE" onPress={() => openAddPlayer()} />
    <ScrollView>
      {playing.map((pl) => {
        const props = {
          onRemove,
          onChangeStrokes,
          teamEvent: false
        }
        return <EventSetupPlayingCard key={`setup_pl_${pl.id}`} item={pl} {...props} />
      })}
    </ScrollView>
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
