import React from 'react'
import { View, FlatList } from 'react-native'
import { arrayOf, shape, func } from 'prop-types'

import EventSetupPlayingCard from 'Scoring/EventSetupPlayingCard'
import TopButton from 'shared/TopButton'
import styles from 'styles'

const SetupTeamEvent = ({
  playing,
  onRemove,
  onAddTeam,
  onChangeStrokes,
  onRemovePlayerFromTeam,
  openAddPlayer
}) => (
  <View style={styles.container}>
    <TopButton title="+ LÄGG TILL LAG" onPress={onAddTeam} />
    <FlatList
      data={playing}
      renderItem={({ item }) => (
        <EventSetupPlayingCard
          item={item}
          {...{
            onRemove,
            onChangeStrokes,
            onRemovePlayerFromTeam,
            onAddPlayerToTeam: () => openAddPlayer(item),
            teamEvent: true
          }}
        />
      )}
      keyExtractor={item => `setup_team_${item.id}`}
    />
  </View>
)

SetupTeamEvent.propTypes = {
  playing: arrayOf(shape()),
  onAddTeam: func.isRequired,
  onRemove: func.isRequired,
  onChangeStrokes: func.isRequired,
  onRemovePlayerFromTeam: func.isRequired,
  openAddPlayer: func.isRequired
}

SetupTeamEvent.defaultProps = {
  playing: []
}

export default SetupTeamEvent
