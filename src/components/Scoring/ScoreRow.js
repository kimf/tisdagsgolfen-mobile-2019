// TODO: Refactor and dry this up!
import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'

import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import PendingSuccessOrErrorText from 'Scoring/PendingSuccessOrErrorText'

const calculateExtraStrokes = (holeIndex, playerStrokes, holesCount) => {
  let extra = 0
  if (holeIndex <= playerStrokes) {
    extra = 1
    if (playerStrokes > holesCount) {
      if (holeIndex <= (playerStrokes - holesCount)) {
        extra = 2
      }
    }
  }
  return extra
}

const getPlayerName = player => `${player.firstName} ${player.lastName.substr(0, 1)}`

const { bool, shape, number, func } = PropTypes

class ScoreRow extends Component {
  static propTypes = {
    teamEvent: bool.isRequired,
    player: shape().isRequired,
    hole: shape().isRequired,
    holesCount: number.isRequired,
    onStartScoring: func.isRequired
  }

  constructor(props) {
    super(props)
    const { hole, player, holesCount } = props
    const liveScore = hole.liveScores.find(ls => ls.user.id === player.id)

    const scoreItem = liveScore ? { ...liveScore, isSaved: true } : {
      strokes: hole.par,
      putts: 2,
      points: 0,
      beers: 0,
      extraStrokes: calculateExtraStrokes(hole.index, player.strokes, holesCount),
      isSaved: false
    }

    this.state = { scoreItem }
  }

  onCloseScoreForm = (savedScoreItem) => {
    const newScoreItem = { ...this.state.scoreItem, ...savedScoreItem }
    this.setState({ scoreItem: newScoreItem })
  }

  openScoringScreen = () => {
    const { player, hole, onStartScoring } = this.props
    onStartScoring(this.state.scoreItem, hole.id, hole.par, player.id)
  }

  render() {
    const { player, hole, teamEvent } = this.props
    const { scoreItem } = this.state

    const playerName = getPlayerName(player)

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
        onPress={!scoreItem.inFlight && this.openScoringScreen}
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
        {teamEvent ? null : <PendingSuccessOrErrorText scoreItem={scoreItem} item="beers" />}
        <PendingSuccessOrErrorText scoreItem={scoreItem} item="strokes" />
        {teamEvent ? null : <PendingSuccessOrErrorText scoreItem={scoreItem} item="putts" />}
        <PendingSuccessOrErrorText fontWeight="bold" scoreItem={scoreItem} item="points" />
        {scoreItem.inFlight ? <ActivityIndicator color="#47C2A5" style={{ marginRight: 5 }} /> : null}
      </TouchableView>
    )
  }
}

export default ScoreRow
