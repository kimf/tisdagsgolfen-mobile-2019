import React from 'react'
import { View, Image } from 'react-native'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

const mutedYellow = { backgroundColor: colors.mutedYellow }
const defaultPhoto = require('../../images/defaultavatar.png')

const ScoringLeaderboardCard = ({ player, currentUserId, sorting, scoringType }) => {
  let pointText
  let pointValue = ''
  let position

  if (sorting === 'beers') {
    pointValue = player.beers
    pointText = '🍺'
    position = player.beerPos
  } else if (sorting === 'kr') {
    pointValue = player.kr - (player.kr * 2)
    pointText = 'kr'
    position = player.krPos
  } else {
    pointValue = player.points
    pointText = 'p'
    position = player.position
  }

  const currentUserStyle = player.id === currentUserId ? mutedYellow : null
  const photoUrl = player.photo ? player.photo.url : null
  console.log(player)
  return (
    <View key={player.id} style={[styles.listrow, currentUserStyle]}>
      <View style={styles.position}>
        <TGText style={{ flex: 1, fontWeight: '800', color: colors.dark, fontSize: 16 }}>
          {position}
        </TGText>
      </View>
      <Image
        style={styles.cardImage}
        source={photoUrl ? { uri: photoUrl } : defaultPhoto}
        resizeMode="cover"
      />
      <View style={styles.cardTitle}>
        <TGText style={styles.name}>{player.firstName} {player.lastName.substr(0, 1)}</TGText>
        {sorting === 'totalPoints'
          ? <TGText style={styles.meta}>
            Efter {player.holes} hål
          </TGText>
          : null
        }
      </View>
      {sorting === 'totalPoints'
        ? <TGText style={styles.dimmerPoints}>
          {scoringType === 'points' ? `${player.strokes} slag` : null}
        </TGText>
        : null
      }
      <TGText style={styles.points}>{`${pointValue} ${pointText}`}</TGText>
    </View>
  )
}

const { shape, string, number } = React.PropTypes

ScoringLeaderboardCard.propTypes = {
  player: shape({
    holes: number.isRequired,
    strokes: number.isRequired,
    points: number.isRequired,
    beerPos: number.isRequired,
    id: string.isRequired,
    krPos: number.isRequired,
    position: number.isRequired,
    firstName: string.isRequired,
    lastName: string.isRequired
  }).isRequired,
  currentUserId: string.isRequired,
  sorting: string.isRequired,
  scoringType: string.isRequired
}

export default ScoringLeaderboardCard
