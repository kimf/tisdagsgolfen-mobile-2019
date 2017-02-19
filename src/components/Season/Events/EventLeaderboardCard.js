import React from 'react'
import { Text, View } from 'react-native'

import styles from '../../../styles'

const EventLeaderboardCard = ({ data, currentUserId, gameType }) => {
  let upOrDown

  if (data.totalPosition < data.previousTotalPosition) {
    upOrDown = <Text style={{ flex: 1, color: 'green' }}>{data.previousTotalPosition}↥{data.totalPosition}</Text>
  } else if (data.totalPosition > data.previousTotalPosition) {
    upOrDown = <Text style={{ flex: 1, color: 'red' }}>{data.totalPosition}↧{data.previousTotalPosition}</Text>
  } else {
    upOrDown = <Text style={{ flex: 1, color: '#ccc' }}>↝{data.totalPosition}</Text>
  }

  const score = data.score
  const player = score.user

  const currentUserStyle = player.id === currentUserId ? { backgroundColor: '#feb' } : null

  if (data.eventCount < 1) {
    return null
  }

  //  🍺 Earnings

  const totalAveragePoints = (data.totalAveragePoints * 2).toFixed() / 2

  return (
    <View key={data.id} style={[styles.listrow, currentUserStyle]}>
      <Text style={{ flex: 1, fontWeight: '800', color: '#000', fontSize: 16 }}>{data.position}</Text>
      <View style={[styles.cardTitle, { flex: 2 }]}>
        <Text style={styles.name}>{player.firstName} {player.lastName[0]}</Text>
        {upOrDown}
      </View>

      <View style={[styles.cardTitle, { flex: 1 }]}>
        <Text style={[styles.metaLarger, { flex: 1 }]}>{score.value} {gameType}</Text>
      </View>

      <View style={[styles.cardTitle, { flex: 1 }]}>
        <Text style={[styles.metaLarger, { flex: 1 }]}>{data.totalEventCount} rundor</Text>
        <Text style={[styles.metaLarger, { flex: 1 }]}>{totalAveragePoints} snitt</Text>
        <Text style={[styles.metaLarger, { flex: 1 }]}>{data.totalEventPoints} total</Text>
      </View>

      <View style={[styles.cardTitle, { flex: 1 }]}>
        <Text style={[styles.metaLarger, { flex: 1 }]}>{score.beers} öl</Text>
        <Text style={[styles.metaLarger, { flex: 1 }]}>{score.kr} kr</Text>
      </View>

      <Text style={[styles.points, { flex: 1 }]}>{`${score.eventPoints} p`}</Text>
    </View>
  )
}

const { shape, number, string } = React.PropTypes

EventLeaderboardCard.propTypes = {
  data: shape({
    id: string.isRequired,
    position: number.isRequired,
    previousTotalPosition: number.isRequired,
    totalAveragePoints: number.isRequired,
    totalEventCount: number.isRequired,
    totalEventPoints: number.isRequired,
    totalPosition: number.isRequired,
    score: {
      id: string.isRequired,
      beers: number.isRequired,
      eventPoints: number.isRequired,
      kr: number.isRequired,
      value: number.isRequired,
      user: {
        id: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired
      }.isRequired
    }.isRequired
  }).isRequired,
  currentUserId: string.isRequired,
  gameType: string.isRequired
}

export default EventLeaderboardCard
