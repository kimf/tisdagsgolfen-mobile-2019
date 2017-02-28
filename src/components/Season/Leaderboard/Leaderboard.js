import React, { Component } from 'react'
import { Dimensions, View, ListView, Image, ScrollView, LayoutAnimation } from 'react-native'
import NavigationBar from 'react-native-navbar'

import LeaderboardCard from './LeaderboardCard'
import Tabs from '../Tabs'
import EmptyState from '../../Shared/EmptyState'
import SeasonPicker from '../SeasonPicker'

import { ranked } from '../../../utils'
import styles from '../../../styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const DEVICE_WIDTH = Dimensions.get('window').width

const leaderboardTabs = [
  { value: 'totalPoints', icon: '🤷', title: 'Poäng' },
  { value: 'beers', icon: '🍻', title: 'Öl' },
  { value: 'kr', icon: '💸', title: 'Skuld' }
]

class Leaderboard extends Component {
  state = { sorting: 'totalPoints', showSeasonPicker: false }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seasonName !== this.props.seasonName) {
      if (this.listView) {
        this.listView.scrollTo({ x: 0, y: 0, animated: true })
      }
      this.setState({ sorting: 'totalPoints' })
    }
  }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.setState({ sorting })
  }

  toggleSeasonpicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker })
  }

  changeSeason = (currentSeasonId) => {
    this.props.onChangeSeason(currentSeasonId)
    this.setState({ showSeasonPicker: false })
  }

  render() {
    const {
      players, seasonName, seasonId, seasons, userId, closed, photoUrl
    } = this.props
    const { sorting, showSeasonPicker } = this.state

    const emptyLeaderboard = players.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(seasonName, 10) > 2015

    let sortedLeaderboard
    if (sorting === 'beers') {
      sortedLeaderboard = players.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedLeaderboard = ranked(sortedLeaderboard, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      sortedLeaderboard = players.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedLeaderboard = ranked(sortedLeaderboard, 'krPos', 'totalKr')
    } else {
      sortedLeaderboard = players.slice().sort((a, b) => a.position - b.position)
    }

    const caret = showSeasonPicker ? '↑' : '↓'
    const rightButtonConfig = {
      title: `${seasonName} ${caret}`,
      handler: () => this.toggleSeasonpicker(),
      tintColor: '#cecece'
    }

    let stickyHeaderIndices = null
    if (showLeaderboardTabs && closed && photoUrl) {
      stickyHeaderIndices = [1]
    } else if (showLeaderboardTabs && !closed) {
      stickyHeaderIndices = [0]
    }

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.header}
          statusBar={{ style: 'light-content', tintColor: '#000' }}
          title={{ title: 'TISDAGSGOLFEN', tintColor: 'white' }}
          rightButton={rightButtonConfig}
        />

        { showSeasonPicker
          ?
            <SeasonPicker
              seasons={seasons}
              currentSeasonId={seasonId}
              onChangeSeason={s => this.changeSeason(s)}
            />
          : null
        }

        <ScrollView stickyHeaderIndices={stickyHeaderIndices}>
          { closed && photoUrl
            ? <Image
              style={{ width: DEVICE_WIDTH, height: 220 }}
              source={{ uri: photoUrl }}
              resizeMode="cover"
            /> : null
          }

          { showLeaderboardTabs
            ?
              <Tabs
                currentRoute={sorting}
                onChange={sort => this.changeSort(sort)}
                tabs={leaderboardTabs}
              />
            : null
          }

          { emptyLeaderboard
            ? <EmptyState text="Inga rundor spelade ännu" />
            : <ListView
              initialListSize={30}
              dataSource={ds.cloneWithRows(sortedLeaderboard)}
              ref={(ref) => { this.listView = ref }}
              renderRow={rowData =>
                <LeaderboardCard key={`l_${userId}`} currentUserId={userId} data={rowData} sorting={sorting} />
              }
              enableEmptySections
            />
          }
        </ScrollView>
      </View>
    )
  }
}

const { arrayOf, bool, func, shape, string } = React.PropTypes

Leaderboard.propTypes = {
  seasonName: string.isRequired,
  seasonId: string.isRequired,
  closed: bool,
  photoUrl: string,
  userId: string.isRequired,
  players: arrayOf(shape()).isRequired,
  seasons: arrayOf(shape({
    id: string.isRequired,
    name: string.isRequired
  })).isRequired,
  onChangeSeason: func.isRequired
}

Leaderboard.defaultProps = {
  closed: false,
  photoUrl: ''
}


export default Leaderboard
