import React, { PropTypes } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from '../styles'

const LeaderboardCard = ({ data, currentUserId, sorting }) => {
  let pointText
  let pointValue = ''
  let upOrDown
  let position

  if (sorting === 'beers') {
    pointValue = data.totalBeers
    pointText = '🍺'
    position = data.beerPos
  } else if (sorting === 'kr') {
    pointValue = data.totalKr
    pointText = 'kr'
    position = data.krPos
  } else {
    pointValue = data.totalPoints
    pointText = 'p'
    position = data.position
    if (data.position < data.previousPosition) {
      upOrDown = <Text style={{ flex: 1, color: 'green' }}>↥{data.previousPosition - data.position}</Text>
    } else if (data.position > data.previousPosition) {
      upOrDown = <Text style={{ flex: 1, color: 'red' }}>↧{data.position - data.previousPosition}</Text>
    }
  }

  const player = data.user
  const averagePoints = data.averagePoints.toLocaleString(
    'sv', { maximumFractionDigits: 1, useGrouping: false }
  )

  const currentUserStyle = player.id === currentUserId ? { backgroundColor: '#feb' } : null

  if (data.eventCount < 1) {
    return null
  }

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View key={data.id} style={[styles.listrow, currentUserStyle]}>
        <View style={styles.position}>
          <Text style={{ flex: 1, fontWeight: '800', color: '#000', fontSize: 16 }}>{position}</Text>
          { upOrDown }
        </View>
        <View style={styles.cardTitle}>
          <Text style={styles.name}>{player.firstName} {player.lastName}</Text>
          { sorting === 'totalPoints'
            ?
              <Text style={styles.metaLarger}>
                {data.eventCount} Rundor.
                Snitt: {averagePoints}p
              </Text>
            : null
          }
        </View>
        <Text style={styles.points}>{`${pointValue} ${pointText}`}</Text>
      </View>
    </TouchableOpacity>
  )
}


LeaderboardCard.propTypes = {
  data: PropTypes.shape.isRequired,
  currentUserId: PropTypes.number.isRequired,
  sorting: PropTypes.string.isRequired
}

export default LeaderboardCard
