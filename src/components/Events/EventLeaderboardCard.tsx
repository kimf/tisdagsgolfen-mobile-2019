import React from 'react'
import { Image, View } from 'react-native'
import styles, { colors } from '../../styles'
import TGText from '../shared/TGText'
const mutedYellow = { backgroundColor: colors.mutedYellow }
const defaultPhoto = require('../../images/defaultavatar.png')
interface EventLeaderboardCardProps {
  data: {
    beerPos?: any
    id: any
    krPos?: any
    position: any
    beers?: any
    kr: any
    eventPoints: any
    photo?: any
    name: any
    value: any
  }
  currentUserId?: any
  sorting: any
  scoringType: any
}
const EventLeaderboardCard: React.SFC<EventLeaderboardCardProps> = ({
  data,
  currentUserId,
  sorting,
  scoringType
}) => {
  let pointText
  let pointValue = ''
  let position
  if (sorting === 'beers') {
    pointValue = data.beers
    pointText = '🍺'
    position = data.beerPos
  } else if (sorting === 'kr') {
    pointValue = data.kr
    pointText = 'kr'
    position = data.krPos
  } else {
    pointValue = data.eventPoints
    pointText = 'p'
    position = data.position
  }
  const currentUserStyle = data.id === currentUserId ? mutedYellow : null
  return (
    <View key={data.id} style={[styles.listrow, currentUserStyle]}>
      <View style={styles.position}>
        <TGText
          style={{
            flex: 1,
            fontWeight: '800',
            color: colors.dark,
            fontSize: 16
          }}>
          {position}
        </TGText>
      </View>
      <Image
        style={styles.cardImage}
        source={data.photo ? { uri: data.photo } : defaultPhoto}
        resizeMode="cover"
      />
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{data.name}</TGText>
      </View>
      {sorting === 'totalPoints' ? (
        <TGText style={styles.dimmerPoints}>
          {data.value} {scoringType === 'points' ? 'p' : 'slag'}
        </TGText>
      ) : null}

      <TGText
        style={[
          styles.points,
          {
            flex: 3,
            fontWeight: '800',
            fontSize: 18,
            textAlign: 'right'
          }
        ]}>
        {`${pointValue} ${pointText}`}
      </TGText>
    </View>
  )
}

export default EventLeaderboardCard
