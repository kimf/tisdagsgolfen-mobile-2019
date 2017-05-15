import React, { Component } from 'react'
import { View, ListView, StyleSheet } from 'react-native'
import { arrayOf, bool, func, string, shape } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import ScoringLeaderboardCard from 'Scoring/ScoringLeaderboardCard'
import BottomButton from 'shared/BottomButton'
import Tabs from 'shared/Tabs'
import TGText from 'shared/TGText'

import { colors } from 'styles'
import { withLiveLeaderboardQuery } from 'queries/liveLeaderboardQuery'
import { ranked, calculateEarnings } from 'utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingTop: 40
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20
  }
})

class ScoringLeaderboard extends Component {
  static propTypes = {
    currentUserId: string.isRequired,
    eventId: string.isRequired,
    onClose: func.isRequired,
    scoringType: string.isRequired,
    data: shape({
      loading: bool,
      liveScores: arrayOf(shape()) // TODO: How do we want the data to look?
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      liveScores: []
    }
  }

  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.setState({ sorting })
  }

  render() {
    const { data, eventId, currentUserId, onClose, scoringType } = this.props
    const { sorting } = this.state

    let sortedPlayers = []

    if (data.liveScores && data.liveScores.length > 0) {
      const players = []
      data.liveScores.forEach((item) => {
        const playerIndex = players.findIndex(p => p.id === item.scoringPlayer.user.id)
        const kr = calculateEarnings(item.putts, item.strokes, item.hole.par)
        if (playerIndex !== -1) {
          const player = players[playerIndex]
          players[playerIndex] = {
            ...player,
            beers: player.beers + item.beers,
            points: player.points + item.points,
            putts: player.putts + item.putts,
            strokes: player.strokes + item.strokes,
            holes: player.holes + 1,
            kr: player.kr + kr
          }
        } else {
          const { scoringPlayer, points, putts, beers, strokes } = item
          const playerItem = {
            ...scoringPlayer.user,
            beers,
            kr,
            points,
            putts,
            strokes,
            holes: 1,
            beerPos: 0,
            krPos: 0,
            position: 0
          }
          players.push(playerItem)
        }
      })

      let sorted = null
      if (sorting === 'beers') {
        sorted = players.slice().sort((a, b) => b.beers - a.beers)
        sortedPlayers = ranked(sorted, 'beerPos', 'beers')
      } else if (sorting === 'kr') {
        sorted = players.slice().sort((a, b) => a.kr - b.kr)
        sortedPlayers = ranked(sorted, 'krPos', 'kr')
      } else {
        sortedPlayers = ranked(players, 'position', scoringType, scoringType === 'strokes')
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inner}>
          {data.loading ? <TGText>Uppdaterar...</TGText> : null}
          <Tabs
            currentRoute={sorting}
            onChange={sort => this.changeSort(sort)}
          />
          <ListView
            removeClippedSubviews={false}
            initialListSize={20}
            dataSource={ds.cloneWithRows(sortedPlayers)}
            ref={(ref) => { this.listView = ref }}
            renderRow={rowData =>
              <ScoringLeaderboardCard
                key={`l_${currentUserId}`}
                scoringType={scoringType}
                currentUserId={currentUserId}
                player={rowData}
                eventId={eventId}
                sorting={sorting}
              />
            }
            enableEmptySections
          />
        </View>
        <BottomButton
          backgroundColor={colors.red}
          title="STÄNG"
          onPress={() => onClose()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({ currentUserId: state.app.currentUser.id })

export default compose(
  connect(mapStateToProps),
  withLiveLeaderboardQuery
)(ScoringLeaderboard)
