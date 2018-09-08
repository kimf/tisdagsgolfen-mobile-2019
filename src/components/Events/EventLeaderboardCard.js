import React from 'react'
import { View, Image } from 'react-native'
import { shape, string, number } from 'prop-types'

import TGText from '../shared/TGText'
import styles, { colors } from '../../styles'

const mutedYellow = { backgroundColor: colors.mutedYellow }
const defaultPhoto = require('../../images/defaultavatar.png')

// TODO: Refactor and re-use LeaderboardCard as much as possible + avatar
const EventLeaderboardCard = ({ data, currentUserId, sorting, scoringType }) => {
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

EventLeaderboardCard.propTypes = {
  data: shape({
    beerPos: number,
    id: string.isRequired,
    krPos: number,
    position: number.isRequired,
    beers: number,
    kr: number.isRequired,
    eventPoints: number.isRequired,
    photo: string,
    name: string.isRequired,
    value: number.isRequired
  }).isRequired, // TODO: Move to propTypes?
  currentUserId: string,
  sorting: string.isRequired,
  scoringType: string.isRequired
}

EventLeaderboardCard.defaultProps = {
  currentUserId: null
}

export default EventLeaderboardCard
