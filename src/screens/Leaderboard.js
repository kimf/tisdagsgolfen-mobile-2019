import React, { Component } from 'react'
import { View, Image, LayoutAnimation, Animated } from 'react-native'
import { connect } from 'react-redux'
import { LogView } from 'react-native-device-log'
import { compose } from 'react-apollo'

import { withLeaderboardQuery } from 'queries/leaderboardQuery'

import { ranked } from 'utils'
import withOneSignal from 'withOneSignal'
import { changeSeason, changeSort } from 'actions/app'

import LeaderboardHeader from 'Season/LeaderboardHeader'
import LeaderboardCard from 'Season/LeaderboardCard'
import SeasonPicker from 'Season/SeasonPicker'
import Tabs from 'shared/Tabs'
import EmptyState from 'shared/EmptyState'
import BottomButton from 'shared/BottomButton'

const { arrayOf, bool, func, shape, string } = React.PropTypes

class Leaderboard extends Component {

  static propTypes = {
    userId: string.isRequired,
    seasons: arrayOf(shape({
      name: string,
      id: string,
      closed: bool,
      photo: shape({
        url: string
      })
    })).isRequired,
    seasonId: string.isRequired,
    sorting: string.isRequired,
    onChangeSort: func.isRequired,
    onChangeSeason: func.isRequired,
    data: shape({
      loading: bool,
      players: arrayOf(LeaderboardCard.propTypes.data)
    }),
    navigator: shape({
      showModal: func.isRequired
    }).isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      players: []
    },
    activeEvent: null
  }


  constructor(props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  state = { showSeasonPicker: false, showLog: false }

  changeSort = (sorting) => {
    // TODO: Warning. The `_component` part is private api, can change!
    // eslint-disable-next-line no-underscore-dangle
    this.listView._component.scrollTo({ x: 0, y: 0, animated: true })
    this.props.onChangeSort(sorting)
  }

  toggleSeasonpicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker })
  }

  changeSeason = (currentSeasonId) => {
    this.props.onChangeSeason(currentSeasonId)
    this.setState({ showSeasonPicker: false })
  }

  toggleLog = () => {
    this.setState({ showLog: !this.state.showLog })
  }

  showActiveEvent = () => {
    const scoringSessionId = this.props.data.scoringSessions[0].id
    this.props.navigator.showModal({
      screen: 'tisdagsgolfen.ScoreEvent',
      title: 'Fortsätt simma...',
      passProps: { scoringSessionId },
      animated: true
    })
  }

  render() {
    if (this.props.data.loading) {
      return null
    }

    const { data, sorting, seasonId, seasons, userId, navigator } = this.props
    const { showSeasonPicker, showLog, scrollY } = this.state

    let sortedPlayers = null

    if (sorting === 'beers') {
      const sorted = data.players.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedPlayers = ranked(sorted, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      const sorted = data.players.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = data.players.slice().sort((a, b) => a.position - b.position)
    }

    const season = seasons.find(s => s.id === seasonId)
    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015
    const showPhoto = season.closed && season.photo.url

    if (showLog) {
      return (
        <LogView
          style={{ flex: 1 }}
          inverted={false}
          timeStampFormat="HH:mm:ss"
          multiExpanded
        />
      )
    }

    const seasonName = seasons.find(s => s.id === seasonId).name

    const activeEvent = data.scoringSessions[0]

    const paddingTop = scrollY.interpolate({
      inputRange: [0, showSeasonPicker ? 160 : 60],
      outputRange: [90, 40],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        {showSeasonPicker
          ? <SeasonPicker
            seasons={seasons}
            currentSeasonId={season.id}
            onChangeSeason={s => this.changeSeason(s)}
          />
          : null
        }

        <LeaderboardHeader
          scrollY={scrollY}
          toggleSeasonpicker={this.toggleSeasonpicker}
          currentSeason={seasonName}
          navigator={navigator}
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
              <LeaderboardCard key={`l_${player.id}`} currentUserId={userId} data={player} sorting={sorting} />
            ))}
          </Animated.ScrollView>
        }
        {activeEvent ? <BottomButton
          title={`FORTSÄTT AKTIV RUNDA PÅ ${activeEvent.event.course.name.toUpperCase()}`}
          onPress={this.showActiveEvent}
        /> : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  seasonId: state.app.seasonId,
  userId: state.app.user.id,
  sorting: state.app.sorting,
  seasons: state.app.seasons
})

const mapDispatchToProps = dispatch => ({
  onChangeSeason: seasonId => dispatch(changeSeason(seasonId)),
  onChangeSort: sorting => dispatch(changeSort(sorting))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLeaderboardQuery,
  withOneSignal
)(Leaderboard)
