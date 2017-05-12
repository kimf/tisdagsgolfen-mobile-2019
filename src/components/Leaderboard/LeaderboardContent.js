import React, { Component } from 'react'
import { View, Image, Animated } from 'react-native'
import { arrayOf, string, func } from 'prop-types'

import LeaderboardCard from 'Leaderboard/LeaderboardCard'
import AnimatedHeader from 'shared/AnimatedHeader'
import Tabs from 'shared/Tabs'
import EmptyState from 'shared/EmptyState'
import TGText from 'shared/TGText'
import TouchableView from 'shared/TouchableView'
import { seasonShape, leaderboardPlayerShape } from 'propTypes'
import { ranked } from 'utils'
import { colors } from 'styles'

class LeaderboardContent extends Component {
  static propTypes = {
    season: seasonShape.isRequired,
    players: arrayOf(leaderboardPlayerShape).isRequired,
    currentUserId: string.isRequired,
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

  render() {
    const { scrollY, sorting } = this.state
    const { players, season, currentUserId, toggleSeasonpicker } = this.props

    let sortedPlayers = null
    if (sorting === 'beers') {
      const sorted = players.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedPlayers = ranked(sorted, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      const sorted = players.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = players.slice().sort((a, b) => a.position - b.position)
    }

    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015
    const showPhoto = season.closed && season.photo.url

    const paddingTop = scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [90, 60],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <AnimatedHeader
          scrollY={scrollY}
          title="Ledartavla"
        >
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
            <Image style={{ tintColor: colors.muted, resizeMode: 'contain', height: 12, width: 12, marginRight: 8 }} source={require('../../images/up.png')} />
            <TGText style={{ fontWeight: 'bold', color: colors.darkGreen }}>{season.name}</TGText>
          </TouchableView>
        </AnimatedHeader>

        {emptyLeaderboard
          ? <EmptyState text="Inga rundor spelade ännu" />
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

export default LeaderboardContent
