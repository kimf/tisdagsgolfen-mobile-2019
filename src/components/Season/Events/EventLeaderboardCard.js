import React from 'react'
import { Text, View } from 'react-native'

import styles from '../../../styles'

const EventLeaderboardCard = ({ data, currentUserId }) => {
  let upOrDown

  if (data.totalPosition < data.previousTotalPosition) {
    upOrDown = <Text style={{ color: 'green' }}>{data.previousTotalPosition}↥{data.totalPosition}</Text>
  } else if (data.totalPosition > data.previousTotalPosition) {
    upOrDown = <Text style={{ color: 'red' }}>{data.totalPosition}↧{data.previousTotalPosition}</Text>
  } else {
    upOrDown = <Text style={{ color: '#ccc' }}>↝{data.totalPosition}</Text>
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
      <Text style={styles.position}>{data.position}</Text>
      {upOrDown}

      <Text>{player.firstName} {player.lastName[0]}</Text>

      <Text>{score.value}</Text>

      <Text>{data.totalEventCount}</Text>
      <Text>{totalAveragePoints}</Text>
      <Text>{data.totalEventPoints}</Text>

      <Text>{score.beers}</Text>
      <Text>{score.kr}</Text>

      <Text>{score.eventPoints}</Text>
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
  currentUserId: string.isRequired
}

export default EventLeaderboardCard
