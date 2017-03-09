import React, { Component } from 'react'
import { View, ListView, Image, ScrollView, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { LogView } from 'react-native-device-log'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { ranked } from '../utils'
import { changeSeason, changeSort } from '../reducers/app'
import { getCurrentSeason } from '../selectors'

import LeaderboardCard from '../components/Season/LeaderboardCard'
import Tabs from '../components/Shared/Tabs'
import EmptyState from '../components/Shared/EmptyState'
import SeasonPicker from '../components/Season/SeasonPicker'

import styles from '../styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Leaderboard extends Component {
  static navigatorButtons = {
    leftButtons: [
      {
        title: 'Log',
        id: 'log'
      }
    ]
  }

  constructor(props) {
    super(props)
    this.setButtons()
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = { showSeasonPicker: false, showLog: false }

  componentWillReceiveProps(nextProps) {
    if (nextProps.season && (nextProps.season.name !== this.props.season.name)) {
      this.setButtons(nextProps.season.name)
      if (this.listView) {
        this.listView.scrollTo({ x: 0, y: 0, animated: true })
      }
    }
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'toggleSeasonpicker') {
        this.toggleSeasonpicker()
        this.setButtons()
      } else if (event.id === 'log') {
        this.toggleLog()
      }
    }
  }

  setButtons = (newSeasonName = null) => {
    const caret = this.state.showSeasonPicker ? '↑' : '↓'
    const seasonName = newSeasonName || this.props.season.name
    this.props.navigator.setButtons({
      rightButtons: [{
        title: `${seasonName} ${caret}`,
        id: 'toggleSeasonpicker'
      }],
      animated: true
    })
  }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
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

  render() {
    if (this.props.data.loading) {
      return null
    }

    const { season, data, sorting, seasons, userId } = this.props
    const { showSeasonPicker } = this.state

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


    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015

    let stickyHeaderIndices = null
    if (showLeaderboardTabs && season.closed && season.photo.url) {
      stickyHeaderIndices = [1]
    } else if (showLeaderboardTabs && !season.closed) {
      stickyHeaderIndices = [0]
    }

    return (
      <View style={styles.container}>
        { this.state.showLog ? <LogView inverted={false} timeStampFormat="HH:mm:ss" multiExpanded /> : null }

        { showSeasonPicker
          ?
            <SeasonPicker
              seasons={seasons}
              currentSeasonId={season.id}
              onChangeSeason={s => this.changeSeason(s)}
            />
          : null
        }

        { emptyLeaderboard
          ? <EmptyState text="Inga rundor spelade ännu" />
          : <ScrollView stickyHeaderIndices={stickyHeaderIndices}>
            { season.closed && season.photo.url
              ? <Image
                style={{ width: '100%', height: 220 }}
                source={{ uri: season.photo.url, cache: 'force-cache' }}
                resizeMode="cover"
              /> : null
            }

            { showLeaderboardTabs
              ?
                <Tabs
                  currentRoute={sorting}
                  onChange={sort => this.changeSort(sort)}
                />
              : null
            }

            <ListView
              initialListSize={30}
              dataSource={ds.cloneWithRows(sortedPlayers)}
              ref={(ref) => { this.listView = ref }}
              renderRow={rowData =>
                <LeaderboardCard key={`l_${userId}`} currentUserId={userId} data={rowData} sorting={sorting} />
              }
              enableEmptySections
            />
          </ScrollView>
        }
      </View>
    )
  }
}

const { arrayOf, bool, func, shape, string } = React.PropTypes

Leaderboard.propTypes = {
  season: shape({
    name: string,
    id: string,
    closed: bool,
    photo: shape({
      url: string
    })
  }).isRequired,
  userId: string.isRequired,
  seasons: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired,
  sorting: string.isRequired,
  onChangeSort: func.isRequired,
  onChangeSeason: func.isRequired,
  data: shape({
    loading: bool,
    players: arrayOf(LeaderboardCard.propTypes.data)
  }).isRequired,
  navigator: shape({
    setOnNavigatorEvent: func.isRequired
  }).isRequired
}

const leaderboardQuery = gql`
  query($seasonId: ID!) {
    players: allSeasonLeaderboards (
      orderBy: position_DESC
      filter: { season: { id: $seasonId } }
    ) {
      id
      averagePoints
      position
      previousPosition
      totalPoints
      totalBeers
      totalKr
      top5Points
      eventCount
      user {
        id
        firstName
        lastName
      }
    }
  }
`

const mapStateToProps = (state, props) => (
  {
    season: getCurrentSeason(state, props),
    seasonId: state.app.seasonId,
    userId: state.app.user.id,
    sorting: state.app.sorting,
    seasons: state.app.seasons
  }
)

const mapDispatchToProps = dispatch => (
  {
    onChangeSeason: seasonId => dispatch(changeSeason(seasonId)),
    onChangeSort: sorting => dispatch(changeSort(sorting))
  }
)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(leaderboardQuery, {
    options: ({ seasonId }) => ({ forceFetch: false, variables: { seasonId } })
  })
)(Leaderboard)
