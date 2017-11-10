import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { string } from 'prop-types'

import { withLeaderboardQuery, leaderboardQueryProps } from 'queries/leaderboardQuery'

import LeaderboardCard from 'Leaderboard/LeaderboardCard'
import Tabs from 'shared/Tabs'
import EmptyState from 'shared/EmptyState'
import Loading from 'shared/Loading'
import { seasonShape } from 'propTypes'
import { ranked } from 'utils'
import { colors, NAVBAR_HEIGHT } from 'styles'

class Leaderboard extends Component {
  static propTypes = {
    season: seasonShape.isRequired,
    data: leaderboardQueryProps.isRequired,
    currentUserId: string
  }

  static defaultProps = { currentUserId: null }

  constructor(props) {
    super(props)

    this.state = {
      sorting: 'totalPoints'
    }
  }

  listView = null

  changeSort = (sorting) => {
    this.listView.scrollToIndex({ index: 0 })
    this.setState(state => ({ ...state, sorting }))
  }

  render() {
    const { sorting } = this.state
    const { data: { loading, players }, season, currentUserId } = this.props

    if (loading) {
      return <Loading text="Laddar ledartavla" />
    }

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
    const showPhoto = !emptyLeaderboard && season.closed && season.photo

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={{ flex: 1, marginTop: NAVBAR_HEIGHT }}>
          {showPhoto ? (
            <Image
              style={{ width: '100%', height: 180 }}
              source={{ uri: season.photo, cache: 'force-cache' }}
              resizeMode="cover"
            />
          ) : null}

          {emptyLeaderboard ? (
            <EmptyState text="Inga rundor spelade ännu" />
          ) : (
            <FlatList
              removeClippedSubviews={false}
              initialNumToRender={10}
              ref={(ref) => {
                this.listView = ref
              }}
              style={{ paddingHorizontal: 10, paddingBottom: 20 }}
              data={sortedPlayers}
              renderItem={({ item }) => (
                <LeaderboardCard currentUserId={currentUserId} player={item} sorting={sorting} />
              )}
              extraData={this.state}
              keyExtractor={player => `l_${player.id}`}
            />
          )}
          <Tabs currentRoute={sorting} onChange={sort => this.changeSort(sort)} />
        </View>
      </View>
    )
  }
}

export default withLeaderboardQuery(Leaderboard)
