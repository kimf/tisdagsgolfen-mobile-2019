import React, { Component } from 'react'
import { View, ListView, LayoutAnimation } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import LeaderboardCard from './LeaderboardCard';
import Tabs from './Tabs';
import Loading from './Loading';

import { ranked } from '../utils'
import styles from '../styles'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const leaderboardTabs = [
  { value: 'totalPoints', icon: '💯', title: 'Poäng' },
  { value: 'beers', icon: '🍻', title: 'Öl' },
  { value: 'kr', icon: '💸', title: 'Skuld' }
];


class Leaderboard extends Component {
  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    LayoutAnimation.configureNext(animations.layout.easeInEaseOut)
    this.setState({sorting})
  }

  render () {
    const { season, user, data} = this.props;
    const { sorting } = this.state;
    if (data.loading)
      return <Loading text="Laddar ledartavlan..." />

    const emptyLeaderboard = data.leaderboard.filter(sl => sl.eventCount !== 0).length === 0;
    if (emptyLeaderboard)
      return <EmptyState text="Inga rundor spelade ännu" />


    const showLeaderboardTabs = parseInt(season.name, 10) > 2015;

    let sortedLeaderboard;
    if(sorting === 'beers') {
      sortedLeaderboard = data.leaderboard.slice().sort((a, b) => b.totalBeers - a.totalBeers);
      sortedLeaderboard = ranked(sortedLeaderboard, 'beerPos', 'totalBeers')
    } else if(sorting === 'kr') {
      sortedLeaderboard = data.leaderboard.slice().sort((a, b) => a.totalKr - b.totalKr);
      sortedLeaderboard = ranked(sortedLeaderboard, 'krPos', 'totalKr')
    } else {
      sortedLeaderboard = data.leaderboard.slice().sort((a, b) => a.position - b.position);
    }

    return (
      <View style={styles.container}>
        { showLeaderboardTabs
          ?
            <Tabs
              currentRoute={sorting}
              onChange={(sort) => this.changeSort(sort)}
              tabs={leaderboardTabs}
            />
          : null
        }
        <ListView
          enableEmptySections={true}
          initialListSize={30}
          dataSource={ds.cloneWithRows(sortedLeaderboard)}
          renderRow={(rowData) =>
            <LeaderboardCard currentUserId={user.id} data={rowData} sorting={sorting} />
          }
        />
      </View>
    )
  }
}

const animations = {
  layout: {
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 30,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
}


const leaderboardQuery = gql`
query leaderboardQuery($currentSeasonId: ID!) {
  leaderboard: allSeasonLeaderboards(
    orderBy: position_ASC, filter: { season: { id: $currentSeasonId }}
  ) {
    id
    averagePoints
    position
    previousPosition
    totalPoints
    top5Points
    eventCount
    totalKr
    totalBeers
    user {
      id
      firstName
      lastName
    }
  }
}
`

export default graphql(leaderboardQuery, {
  options: ({ season }) => ({ variables: {currentSeasonId: season.id}})
})(Leaderboard);
