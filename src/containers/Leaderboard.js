import React, { Component } from 'react'
import { Dimensions, View, ListView, Image, ScrollView, LayoutAnimation } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { connect } from 'react-redux'
import { LogView } from 'react-native-device-log'

import { changeSeason, changeSort } from '../reducers/season'
import { getSortedPlayers } from '../selectors'

import LeaderboardCard from '../components/Season/LeaderboardCard'
import Tabs from '../components/Shared/Tabs'
import EmptyState from '../components/Shared/EmptyState'
import SeasonPicker from '../components/Season/SeasonPicker'

import styles from '../styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const DEVICE_WIDTH = Dimensions.get('window').width

export class Leaderboard extends Component {
  state = { showSeasonPicker: false, showLog: false }

  componentWillReceiveProps(nextProps) {
    if (nextProps.season.name !== this.props.season.name) {
      if (this.listView) {
        this.listView.scrollTo({ x: 0, y: 0, animated: true })
      }
    }
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
    const { season, sortedPlayers, sorting, seasonNavigationItems, userId } = this.props
    const { showSeasonPicker } = this.state

    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015

    const caret = showSeasonPicker ? '↑' : '↓'
    const rightButtonConfig = {
      title: `${season.name} ${caret}`,
      handler: () => this.toggleSeasonpicker(),
      tintColor: '#efefef'
    }

    let stickyHeaderIndices = null
    if (showLeaderboardTabs && season.closed && season.photo.url) {
      stickyHeaderIndices = [1]
    } else if (showLeaderboardTabs && !season.closed) {
      stickyHeaderIndices = [0]
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.header}
          statusBar={{ style: 'light-content', tintColor: '#2ecc71' }}
          title={{ title: 'Tisdagsgolfen', tintColor: 'white' }}
          rightButton={rightButtonConfig}
          leftButton={{ title: 'Log', handler: () => this.toggleLog(), tintColor: '#000' }}
        />

        { this.state.showLog ? <LogView inverted={false} timeStampFormat="HH:mm:ss" multiExpanded /> : null }

        { showSeasonPicker
          ?
            <SeasonPicker
              seasons={seasonNavigationItems}
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
                style={{ width: DEVICE_WIDTH, height: 220 }}
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
    name: string.isRequired,
    id: string.isRequired,
    closed: bool.isRequired,
    photo: shape({
      url: string
    }),
    players: arrayOf(LeaderboardCard.propTypes.data).isRequired
  }).isRequired,
  sortedPlayers: arrayOf(LeaderboardCard.propTypes.data).isRequired,
  userId: string.isRequired,
  seasonNavigationItems: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired,
  sorting: string.isRequired,
  onChangeSort: func.isRequired,
  onChangeSeason: func.isRequired
}

const mapStateToProps = (state, props) => (
  {
    sorting: state.season.sorting,
    sortedPlayers: getSortedPlayers(state, props),
    seasonNavigationItems: state.season.seasonNavigationItems
  }
)

const mapDispatchToProps = dispatch => (
  {
    onChangeSeason: seasonId => dispatch(changeSeason(seasonId)),
    onChangeSort: sorting => dispatch(changeSort(sorting))
  }
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Leaderboard)
