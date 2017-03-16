// TODO: Refactor and dry this up!
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import ScoreItemText from 'Scoring/ScoreItemText'

const { bool, shape, func } = PropTypes

class ScoreRow extends Component {
  static propTypes = {
    teamEvent: bool.isRequired,
    player: shape().isRequired,
    hole: shape().isRequired,
    onStartScoring: func.isRequired,
    scoreItem: shape().isRequired
  }

  openScoringScreen = () => {
    const { scoreItem, player, hole, onStartScoring } = this.props
    onStartScoring(scoreItem, hole.id, hole.par, player.id)
  }

  render() {
    const { player, hole, teamEvent, scoreItem } = this.props

    const playerName = `${player.firstName} ${player.lastName.substr(0, 1)}`

    let playerNames = null
    if (teamEvent) {
      playerNames = player.players.map(p => (
        <TGText key={`team_player_name_${p.id}`}>
          {p.name}
        </TGText>
      ))
    }

    return (
      <TouchableView
        onPress={this.openScoringScreen}
        style={{ paddingVertical: 20, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee' }}
        key={`scoreRowDeluxe_${hole.id}_${player.id}`}
      >
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <TGText style={{ fontWeight: 'bold', fontSize: '20' }}>
            {teamEvent ? `Lag ${player.id + 1}` : playerName}
          </TGText>
          <TGText style={{ marginLeft: 10, color: '#777' }}>{scoreItem.extraStrokes} slag</TGText>
          <TGText>{playerNames}</TGText>
        </View>
        {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.beers} />}
        { scoreItem.id ? <ScoreItemText title={scoreItem.strokes} /> : null }
        {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
        { scoreItem.id ? <ScoreItemText fontWeight="bold" title={scoreItem.points} /> : null }
        { !scoreItem.id ? <TGText>SÄTT RESULTAT</TGText> : null }
      </TouchableView>
    )
  }
}

export default ScoreRow
