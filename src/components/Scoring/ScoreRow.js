// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import ScoreItemText from 'Scoring/ScoreItemText'

const { bool, shape, func, string } = PropTypes

class ScoreRow extends Component {
  static propTypes = {
    teamEvent: bool.isRequired,
    player: shape().isRequired,
    hole: shape().isRequired,
    onStartScoring: func.isRequired,
    scoreItem: shape().isRequired,
    itemName: string.isRequired
  }

  openScoringScreen = () => {
    const { onStartScoring, player, scoreItem } = this.props
    onStartScoring(player.id, scoreItem)
  }

  render() {
    const { player, hole, teamEvent, scoreItem, itemName } = this.props
    let playerNames = null

    if (teamEvent) {
      playerNames = player.users.map(p => (
        <TGText key={`team_player_name_${p.id}`}>
          {p.firstName} {p.lastName.substr(0, 1)}
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
            {itemName}
          </TGText>
          <TGText style={{ marginLeft: 10, color: '#777' }}>{scoreItem.extraStrokes} slag</TGText>
          {teamEvent ? <TGText>{playerNames}</TGText> : null}
        </View>
        {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.beers} />}
        {scoreItem.id ? <ScoreItemText title={scoreItem.strokes} /> : null}
        {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
        {scoreItem.id ? <ScoreItemText fontWeight="bold" title={scoreItem.points} /> : null}
        {!scoreItem.id ? <TGText>SÄTT RESULTAT</TGText> : null}
      </TouchableView>
    )
  }
}

export default ScoreRow
