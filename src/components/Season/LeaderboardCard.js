import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import styles from '../../styles'

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
  const averagePoints = (data.averagePoints * 2).toFixed() / 2

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

const { shape, string, number } = React.PropTypes

LeaderboardCard.propTypes = {
  data: shape({
    averagePoints: number.isRequired,
    beerPos: number.isRequired,
    eventCount: number.isRequired,
    id: string.isRequired,
    krPos: number.isRequired,
    position: number.isRequired,
    previousPosition: number.isRequired,
    totalBeers: number.isRequired,
    totalKr: number.isRequired,
    totalPoints: number.isRequired,
    user: shape({
      id: string.isRequired,
      firstName: string.isRequired,
      lastName: string.isRequired
    }).isRequired
  }).isRequired,
  currentUserId: string.isRequired,
  sorting: string.isRequired
}

export default LeaderboardCard
