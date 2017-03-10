import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import TGText from 'shared/TGText'
// TODO: Rewrite with TGText for realz

import styles from 'styles'

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
      upOrDown = <TGText style={{ flex: 1, color: 'green' }}>↥{data.previousPosition - data.position}</TGText>
    } else if (data.position > data.previousPosition) {
      upOrDown = <TGText style={{ flex: 1, color: 'red' }}>↧{data.position - data.previousPosition}</TGText>
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
          <TGText style={{ flex: 1, fontWeight: '800', color: '#000', fontSize: 16 }}>{position}</TGText>
          { upOrDown }
        </View>
        <View style={styles.cardTitle}>
          <TGText style={styles.name}>{player.firstName} {player.lastName}</TGText>
          { sorting === 'totalPoints'
            ?
              <TGText style={styles.metaLarger}>
                {data.eventCount} Rundor.
                Snitt: {averagePoints}p
              </TGText>
            : null
          }
        </View>
        <TGText style={styles.points}>{`${pointValue} ${pointText}`}</TGText>
      </View>
    </TouchableOpacity>
  )
}

const { shape, string, number } = React.PropTypes

LeaderboardCard.propTypes = {
  data: shape({
    averagePoints: number.isRequired,
    beerPos: number,
    eventCount: number.isRequired,
    id: string.isRequired,
    krPos: number,
    position: number.isRequired,
    previousPosition: number.isRequired,
    totalBeers: number,
    totalKr: number,
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
