import React from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import styles from 'styles'

const EventLeaderboardCard = ({ data, currentUserId, sorting, scoringType }) => {
  let pointText
  let pointValue = ''
  let upOrDown
  let position

  if (sorting === 'beers') {
    pointValue = data.score.beers
    pointText = '🍺'
    position = data.beerPos
  } else if (sorting === 'kr') {
    pointValue = data.score.kr
    pointText = 'kr'
    position = data.krPos
  } else {
    pointValue = data.score.eventPoints
    pointText = 'p'
    position = data.position
    if (data.totalPosition < data.previousTotalPosition) {
      upOrDown = <TGText style={{ flex: 1, color: 'green' }}>↥{data.previousTotalPosition - data.totalPosition}</TGText>
    } else if (data.totalPosition > data.previousTotalPosition) {
      upOrDown = <TGText style={{ flex: 1, color: 'red' }}>↧{data.totalPosition - data.previousTotalPosition}</TGText>
    }
  }

  const player = data.score.user
  const averagePoints = (data.totalAveragePoints * 2).toFixed() / 2

  const currentUserStyle = player.id === currentUserId ? { backgroundColor: '#feb' } : null


  return (
    <View key={data.id} style={[styles.listrow, currentUserStyle]}>
      <View style={styles.position}>
        <TGText style={{ flex: 1, fontWeight: '800', color: '#000', fontSize: 16 }}>{position}</TGText>
        { upOrDown }
      </View>
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{player.firstName} {player.lastName}</TGText>
        { sorting === 'totalPoints'
          ?
            <TGText style={styles.meta}>
              {data.totalEventCount} Rundor.
              Totalt: {data.totalEventPoints}p
              Snitt: {averagePoints}p
            </TGText>
          : null
        }
      </View>
      { sorting === 'totalPoints'
        ? <TGText style={styles.dimmerPoints}>
          {data.score.value} {scoringType === 'points' ? 'p' : 'slag'}
        </TGText>
        : null
      }

      <TGText style={styles.points}>{`${pointValue} ${pointText}`}</TGText>
    </View>
  )
}

const { shape, string, number } = React.PropTypes

EventLeaderboardCard.propTypes = {
  data: shape({
    beerPos: number,
    id: string.isRequired,
    krPos: number,
    position: number.isRequired,
    previousTotalPosition: number.isRequired,
    score: shape({
      beers: number,
      kr: number,
      eventPoints: number.isRequired,
      user: shape({
        id: string.isRequired,
        firstName: string.isRequired,
        lastName: string.isRequired
      }),
      value: number.isRequired
    }),
    totalAveragePoints: number.isRequired,
    totalEventCount: number.isRequired,
    totalEventPoints: number.isRequired,
    totalPosition: number.isRequired
  }).isRequired,
  currentUserId: string.isRequired,
  sorting: string.isRequired,
  scoringType: string.isRequired
}

export default EventLeaderboardCard
