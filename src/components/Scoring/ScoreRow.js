// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'

import TGText from 'shared/TGText'
import ScoreItemText from 'Scoring/ScoreItemText'

const { bool, shape, func } = PropTypes

class ScoreRow extends Component {
  static propTypes = {
    teamEvent: bool.isRequired,
    player: shape().isRequired,
    hole: shape().isRequired,
    scoreItem: shape().isRequired
  }

  render() {
    const { player, hole, teamEvent, scoreItem } = this.props

    return (
      <View style={{ flexDirection: 'row' }}>
        {teamEvent || !scoreItem.id ? null : <ScoreItemText dimmed title={scoreItem.beers} />}
        {scoreItem.id ? <ScoreItemText title={scoreItem.strokes} /> : null}
        {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
        {scoreItem.id ? <ScoreItemText fontSize="30" fontWeight="bold" textAlign="center" title={scoreItem.points} /> : null}
        {!scoreItem.id ? <TGText>SÄTT RESULTAT</TGText> : null}
      </View>
    )
  }
}

export default ScoreRow
