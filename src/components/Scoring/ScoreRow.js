import React, { PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'

const ScoreRow = ({ teamEvent, player, hole, holesCount, showScoreForm, eventScore }) => {
  const playerName = `${player.firstName} ${player.lastName}`

  // TODO: This should be calculated once!
  let extraStrokes = 0
  if (hole.index <= player.strokes) {
    extraStrokes = 1
    if (player.strokes > holesCount) {
      if (hole.index <= (player.strokes - holesCount)) {
        extraStrokes = 2
      }
    }
  }

  let extraStrokesDots = ''
  for (let i = 0; i < extraStrokes; i += 1) {
    extraStrokesDots += '•'
  }

  let playerNames = null
  if (teamEvent) {
    playerNames = player.players.map(p => (
      <TGText key={`team_player_name_${p.id}`}>
        {p.name}
      </TGText>
    ))
  }

  const esItem = eventScore || {
    strokes: null,
    points: null,
    putts: null
  }

  return (
    <View
      style={{ paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' }}
      key={`scoreRowDeluxe_${hole.id}_${player.id}`}
    >
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <TGText onPress={() => showScoreForm(player, esItem, extraStrokes)}>
          {teamEvent ? `Lag ${player.id + 1}` : playerName}
        </TGText>
        <TGText style={{ marginLeft: 5 }}>{extraStrokesDots}</TGText>
        <TGText>{playerNames}</TGText>
      </View>
      <TGText style={{ flex: 1, textAlign: 'center' }}>{esItem.strokes || null}</TGText>
      {teamEvent ? null : (
        <TGText style={{ flex: 1, textAlign: 'center' }}>{esItem.putts || null}</TGText>
      )}
      <TGText style={{ flex: 1, textAlign: 'center' }}>{esItem.points || null}</TGText>
    </View>
  )
}

const { bool, shape, func, number } = PropTypes
ScoreRow.propTypes = {
  teamEvent: bool.isRequired,
  player: shape().isRequired,
  hole: shape().isRequired,
  holesCount: number.isRequired,
  showScoreForm: func.isRequired,
  eventScore: shape()
}

ScoreRow.defaultProps = {
  eventScore: null
}

export default ScoreRow
