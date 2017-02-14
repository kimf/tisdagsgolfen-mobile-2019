import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LeaderboardCard from './LeaderboardCard'
import Tabs from '../Tabs'
import EmptyState from '../../Shared/EmptyState'
import Loading from '../../Shared/Loading'

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
    const { data, seasonName, userId } = this.props
    const { sorting } = this.state

    if (data.loading) {
      return <Loading text="Laddar ledartavla..." />
    }

    const emptyLeaderboard = data.items.filter(sl => sl.eventCount !== 0).length === 0
    if (emptyLeaderboard) {
      return <EmptyState text="Inga rundor spelade ännu" />
    }


    const showLeaderboardTabs = parseInt(seasonName, 10) > 2015

    let sortedLeaderboard
    if (sorting === 'beers') {
      sortedLeaderboard = data.items.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedLeaderboard = ranked(sortedLeaderboard, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      sortedLeaderboard = data.items.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedLeaderboard = ranked(sortedLeaderboard, 'krPos', 'totalKr')
    } else {
      sortedLeaderboard = data.items.slice().sort((a, b) => a.position - b.position)
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

const { arrayOf, bool, shape, string } = React.PropTypes

Leaderboard.propTypes = {
  data: shape({
    loading: bool,
    items: arrayOf(shape())
  }),
  seasonName: string.isRequired,
  userId: string.isRequired
}

Leaderboard.defaultProps = {
  data: {
    loading: true,
    items: []
  }
}

const leaderboardQuery = gql`
  query($seasonId: ID!) {
    items: allSeasonLeaderboards (
      orderBy: position_DESC,
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

const LeaderboardWithData = graphql(leaderboardQuery, {
  options: ({ seasonId }) => ({ variables: { seasonId } })
})(Leaderboard)

LeaderboardWithData.propTypes = {
  seasonId: string.isRequired
}

export default LeaderboardWithData
