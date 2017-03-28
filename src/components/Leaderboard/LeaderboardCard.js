import React from 'react'
import { View, Image } from 'react-native'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'
import { leaderboardPlayerShape } from 'propTypes'

const mutedYellow = { backgroundColor: colors.mutedYellow }

const defaultAvatar = require('../../images/defaultavatar.png')

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
      upOrDown = (
        <TGText style={{ fontSize: 14, flex: 1, color: colors.green }}>
          ↥{data.previousPosition - data.position}
        </TGText>
      )
    } else if (data.position > data.previousPosition) {
      upOrDown = (
        <TGText style={{ fontSize: 14, flex: 1, color: colors.red }}>
          ↧{data.position - data.previousPosition}
        </TGText>
      )
    }
  }

  const player = data.user
  const averagePoints = (data.averagePoints * 2).toFixed() / 2

  const currentUserStyle = player.id === currentUserId ? mutedYellow : null

  if (data.eventCount < 1) {
    return null
  }

  const photoSrc = player.photo ? { uri: player.photo.url } : defaultAvatar
  return (
    <View key={data.id} style={[styles.listrow, currentUserStyle]}>
      <View style={styles.position}>
        <TGText style={{ flex: 1, fontWeight: '800', color: colors.dark, fontSize: 16 }}>{position}</TGText>
        {upOrDown}
      </View>
      <Image
        style={styles.cardImage}
        source={photoSrc}
        resizeMode="cover"
      />
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{player.firstName} {player.lastName}</TGText>
        {sorting === 'totalPoints'
          ? <TGText style={styles.metaLarger}>
            {data.eventCount} Rundor.
              Snitt: {averagePoints}p
          </TGText>
          : null
        }
      </View>
      <TGText style={styles.points}>{`${pointValue} ${pointText}`}</TGText>
    </View>
  )
}

const { string } = React.PropTypes
LeaderboardCard.propTypes = {
  data: leaderboardPlayerShape.isRequired,
  currentUserId: string.isRequired,
  sorting: string.isRequired
}

export default LeaderboardCard
