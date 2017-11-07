import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { string, func } from 'prop-types'

import { withLeaderboardQuery, leaderboardQueryProps } from 'queries/leaderboardQuery'

import LeaderboardCard from 'Leaderboard/LeaderboardCard'
import Header from 'shared/Header'
import Tabs from 'shared/Tabs'
import EmptyState from 'shared/EmptyState'
import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import { seasonShape } from 'propTypes'
import { ranked } from 'utils'
import { colors, NAVBAR_HEIGHT } from 'styles'

class LeaderboardContent extends Component {
  static propTypes = {
    season: seasonShape.isRequired,
    data: leaderboardQueryProps.isRequired,
    toggleSeasonpicker: func.isRequired,
    currentUserId: string.isRequired
  }

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
    const {
      data: { loading, players }, season, toggleSeasonpicker, currentUserId
    } = this.props

    if (loading) {
      return null
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
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015
    const showPhoto = !emptyLeaderboard && season.closed && season.photo

    let listHeaderComponent = null
    if (showLeaderboardTabs) {
      listHeaderComponent = <Tabs currentRoute={sorting} onChange={sort => this.changeSort(sort)} />
    }

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Header title="Ledartavla" backgroundColor={colors.white}>
          <TouchableView
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 0,
              paddingLeft: 20,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={toggleSeasonpicker}
          >
            <Image
              style={{
                tintColor: colors.muted,
                resizeMode: 'contain',
                height: 12,
                width: 12,
                marginRight: 8
              }}
              source={require('../../images/up.png')}
            />
            <TGText style={{ fontWeight: 'bold', color: colors.darkGreen }}>{season.name}</TGText>
          </TouchableView>
        </Header>

        <View style={{ flex: 1, marginTop: NAVBAR_HEIGHT }}>
          {listHeaderComponent}

          {showPhoto ? (
            <Image
              style={{ width: '100%', height: 120 }}
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
        </View>
      </View>
    )
  }
}

export default withLeaderboardQuery(LeaderboardContent)
