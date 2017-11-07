import React from 'react'
import { View, Image } from 'react-native'
import { string } from 'prop-types'

import TGText from 'shared/TGText'
import UpOrDown from 'shared/UpOrDown'
import styles, { colors } from 'styles'
import { leaderboardPlayerShape } from 'propTypes'

const mutedYellow = { backgroundColor: colors.mutedYellow }

const defaultAvatar = require('../../images/defaultavatar.png')

const LeaderboardCard = ({ player, sorting, currentUserId }) => {
  let pointText
  let pointValue = ''
  let position

  if (sorting === 'beers') {
    pointValue = player.beers
    pointText = '🍺'
    position = player.beerPos
  } else if (sorting === 'kr') {
    pointValue = player.totalKr - player.totalKr * 2
    pointText = 'kr'
    position = player.krPos
  } else {
    pointValue = player.totalPoints
    pointText = 'p'
    position = player.position
  }

  const averagePoints = (player.average * 2).toFixed() / 2

  const currentUserStyle = player.id.split('_')[0] === currentUserId ? mutedYellow : null

  if (player.eventCount < 1) {
    return null
  }

  return (
    <View key={player.id} style={[styles.listrow, currentUserStyle]}>
      <View style={styles.position}>
        <TGText
          style={{
            flex: 1,
            fontWeight: '800',
            color: colors.dark,
            fontSize: 16
          }}
        >
          {position}
        </TGText>
        <UpOrDown prev={player.prevPosition} current={player.position} />
      </View>
      <Image
        style={styles.cardImage}
        source={player.photo ? { uri: player.photo } : defaultAvatar}
        resizeMode="cover"
      />
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{player.name}</TGText>
        {sorting === 'totalPoints' ? (
          <TGText style={styles.metaLarger}>
            {player.eventCount} Rundor. Snitt: {averagePoints}p
          </TGText>
        ) : null}
      </View>
      <TGText style={styles.points}>{`${pointValue} ${pointText}`}</TGText>
    </View>
  )
}

LeaderboardCard.propTypes = {
  currentUserId: string.isRequired,
  player: leaderboardPlayerShape.isRequired,
  sorting: string.isRequired
}

export default LeaderboardCard
