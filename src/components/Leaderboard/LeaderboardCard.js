import React from 'react'
import { View, Image } from 'react-native'
import { string, bool, func } from 'prop-types'

import TGText from 'shared/TGText'
import UpOrDown from 'shared/UpOrDown'
import styles, { colors } from 'styles'
import { leaderboardPlayerShape } from 'propTypes'

const mutedYellow = { backgroundColor: colors.mutedYellow }

const defaultAvatar = require('../../images/defaultavatar.png')

const LeaderboardCard = ({ player, sorting, currentUserId, showSummary, toggleSummary }) => {
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

  const currentUserStyle =
    currentUserId && player.id.split('_')[0] === currentUserId ? mutedYellow : null

  if (player.eventCount < 1) {
    return null
  }

  return (
    <View key={player.id} style={[styles.listrow, currentUserStyle]} onPress={toggleSummary}>
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
        {sorting === 'totalPoints' && (
          <UpOrDown prev={player.prevPosition} current={player.position} />
        )}
      </View>
      <Image
        style={styles.cardImage}
        source={player.photo ? { uri: player.photo } : defaultAvatar}
        resizeMode="cover"
      />
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{player.name}</TGText>
        <TGText style={styles.meta}>
          {player.eventCount} {player.eventCount > 1 ? 'Rundor' : 'Runda'}.
          {sorting === 'totalPoints' && (
            <TGText style={styles.meta}> Snitt: {averagePoints}p</TGText>
          )}
        </TGText>
      </View>
      <View style={styles.points}>
        <TGText
          style={{
            flex: 1,
            fontWeight: '800',
            fontSize: 18,
            textAlign: 'right'
          }}>
          {`${pointValue} ${pointText}`}
        </TGText>
        {sorting === 'totalPoints' && (
          <TGText style={[styles.meta, { flex: 1, textAlign: 'right', fontSize: 10 }]}>
            25, 25, 20, 20, 15
          </TGText>
        )}
      </View>
    </View>
  )
}

LeaderboardCard.propTypes = {
  currentUserId: string,
  player: leaderboardPlayerShape.isRequired,
  sorting: string.isRequired,
  showSummary: bool,
  toggleSummary: func
}

LeaderboardCard.defaultProps = {
  showSummary: false,
  toggleSummary: () => {}
}

LeaderboardCard.defaultProps = { currentUserId: null }

export default LeaderboardCard
