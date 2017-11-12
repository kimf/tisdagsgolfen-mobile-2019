import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { arrayOf, string } from 'prop-types'

import LeaderboardCard from 'Leaderboard/LeaderboardCard'

import EmptyState from 'shared/EmptyState'
import { ranked } from 'utils'
import { colors } from 'styles'
import { leaderboardPlayerShape } from 'propTypes'

class Leaderboard extends Component {
  static propTypes = {
    seasonId: string.isRequired,
    eventId: string.isRequired,
    players: arrayOf(leaderboardPlayerShape).isRequired,
    currentUserId: string,
    sorting: string
  }

  static defaultProps = { currentUserId: null, sorting: 'totalPoints' }

  render() {
    const {
      sorting, players, currentUserId, seasonId, eventId
    } = this.props

    let sortedPlayers = null
    if (sorting === 'beers') {
      const sorted = players.slice().sort((a, b) => b.beers - a.beers)
      sortedPlayers = ranked(sorted, 'beerPos', 'beers')
    } else if (sorting === 'kr') {
      const sorted = players.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = players.slice().sort((a, b) => a.position - b.position)
    }

    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flex: 1 }}>
          {emptyLeaderboard ? (
            <EmptyState text="Inga rundor spelade ännu" />
          ) : (
            <FlatList
              removeClippedSubviews={false}
              initialNumToRender={10}
              style={{ paddingHorizontal: 10, paddingBottom: 20 }}
              data={sortedPlayers}
              renderItem={({ item }) => (
                <LeaderboardCard currentUserId={currentUserId} player={item} sorting={sorting} />
              )}
              extraData={this.state}
              keyExtractor={player => `l_${seasonId}_${eventId}_${player.id}`}
            />
          )}
        </View>
      </View>
    )
  }
}

export default Leaderboard