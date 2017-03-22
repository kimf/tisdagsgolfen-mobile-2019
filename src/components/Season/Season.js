import React, { Component, PropTypes } from 'react'
import { View, Image, Animated } from 'react-native'

import { ranked } from 'utils'

import LeaderboardHeader from 'Season/LeaderboardHeader'
import LeaderboardCard from 'Season/LeaderboardCard'
import Tabs from 'shared/Tabs'
import EmptyState from 'shared/EmptyState'

const { arrayOf, string, bool, shape, func } = PropTypes

class Season extends Component {
  static propTypes = {
    seasons: arrayOf(shape({
      name: string,
      id: string,
      closed: bool,
      photo: shape({
        url: string
      }),
      players: arrayOf(LeaderboardCard.propTypes.data)
    })).isRequired,
    currentUserId: string.isRequired,
    currentSeasonId: string.isRequired,
    navigation: shape().isRequired,
    toggleSeasonpicker: func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      sorting: 'totalPoints',
      scrollY: new Animated.Value(0)
    }
  }

  changeSort = (sorting) => {
    // TODO: Warning. The `_component` part is private api, can change!
    // eslint-disable-next-line no-underscore-dangle
    this.listView._component.scrollTo({ x: 0, y: 0, animated: true })
    this.setState(state => ({ ...state, sorting }))
  }

  gotoProfile = () => {
    this.props.navigation.navigate('Profile')
  }

  gotoEvents = () => {
    const { seasons, currentSeasonId, currentUserId } = this.props
    const season = seasons.find(s => s.id === currentSeasonId)
    this.props.navigation.navigate('Events', {
      userId: currentUserId,
      seasonId: season.id,
      seasonClosed: season.closed
    })
  }

  render() {
    const { scrollY, sorting } = this.state
    const { currentSeasonId, currentUserId, seasons, toggleSeasonpicker } = this.props
    const season = seasons.find(s => s.id === currentSeasonId)

    let sortedPlayers = null
    if (sorting === 'beers') {
      const sorted = season.players.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedPlayers = ranked(sorted, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      const sorted = season.players.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = season.players.slice().sort((a, b) => a.position - b.position)
    }

    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015
    const showPhoto = season.closed && season.photo.url

    const paddingTop = scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [90, 40],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <LeaderboardHeader
          scrollY={scrollY}
          toggleSeasonpicker={toggleSeasonpicker}
          currentSeason={season.name}
          gotoEvents={this.gotoEvents}
          gotoProfile={this.gotoProfile}
        />

        {emptyLeaderboard
          ? <EmptyState style={{ paddingTop: 200 }} text="Inga rundor spelade ännu" />
          : <Animated.ScrollView
            style={[
              { padding: 10 },
              { transform: [{ translateY: paddingTop }] }
            ]}
            ref={(c) => { this.listView = c }}
            scrollEventThrottle={1}
            stickyHeaderIndices={showLeaderboardTabs ? [0] : null}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            {showLeaderboardTabs
              ? <Tabs
                currentRoute={sorting}
                onChange={sort => this.changeSort(sort)}
              />
              : null
            }
            {showPhoto ? <Image
              style={{ width: '100%', height: 220 }}
              source={{ uri: season.photo.url, cache: 'force-cache' }}
              resizeMode="cover"
            /> : null}
            {sortedPlayers.map(player => (
              <LeaderboardCard key={`l_${player.id}`} currentUserId={currentUserId} data={player} sorting={sorting} />
            ))}
          </Animated.ScrollView>
        }
      </View>
    )
  }
}

export default Season
