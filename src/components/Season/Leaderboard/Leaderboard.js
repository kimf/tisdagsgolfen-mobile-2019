import React, { Component } from 'react'
import { View, ListView } from 'react-native'

import LeaderboardCard from './LeaderboardCard'
import Tabs from '../Tabs'
import EmptyState from '../../Shared/EmptyState'

import { ranked } from '../../../utils'
import styles from '../../../styles'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const leaderboardTabs = [
  { value: 'totalPoints', icon: '🤷', title: 'Poäng' },
  { value: 'beers', icon: '🍻', title: 'Öl' },
  { value: 'kr', icon: '💸', title: 'Skuld' }
]


class Leaderboard extends Component {
  state = { sorting: 'totalPoints' }

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

  render() {
    const { players, seasonName, userId } = this.props
    const { sorting } = this.state

    const emptyLeaderboard = players.filter(sl => sl.eventCount !== 0).length === 0
    if (emptyLeaderboard) {
      return <EmptyState text="Inga rundor spelade ännu" />
    }


    const showLeaderboardTabs = parseInt(seasonName, 10) > 2015

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

    return (
      <View style={styles.container}>
        { showLeaderboardTabs
          ?
            <Tabs
              currentRoute={sorting}
              onChange={sort => this.changeSort(sort)}
              tabs={leaderboardTabs}
            />
          : null
        }
        <ListView
          initialListSize={30}
          dataSource={ds.cloneWithRows(sortedLeaderboard)}
          ref={(ref) => { this.listView = ref }}
          renderRow={rowData =>
            <LeaderboardCard key={`l_${userId}`} currentUserId={userId} data={rowData} sorting={sorting} />
          }
          enableEmptySections
        />
      </View>
    )
  }
}

const { arrayOf, shape, string } = React.PropTypes

Leaderboard.propTypes = {
  seasonName: string.isRequired,
  userId: string.isRequired,
  players: arrayOf(shape()).isRequired
}


export default Leaderboard
