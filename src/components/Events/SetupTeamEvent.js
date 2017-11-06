import React from 'react'
import { View, ScrollView } from 'react-native'
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
    <ScrollView>
      {playing.map((team) => {
        const props = {
          onRemove,
          onChangeStrokes,
          onRemovePlayerFromTeam,
          onAddPlayerToTeam: () => openAddPlayer(team),
          teamEvent: true
        }
        return <EventSetupPlayingCard key={`setup_team_${team.id}`} item={team} {...props} />
      })}
    </ScrollView>
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
