import React, { Component, PropTypes } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ListView,
  LayoutAnimation
} from "react-native";

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '../components/Loading';
import LeaderboardCard from '../components/LeaderboardCard';
import EmptyState from '../components/EmptyState';
import Tabs from '../components/Tabs';
import EventCard from '../components/EventCard';

import styles from '../styles';
import { ranked } from '../utils'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const viewTabs = [
  { value: 'leaderboard', title: 'Ledartavla' },
  { value: 'events', title: 'Rundor' }
];

const leaderboardTabs = [
  { value: 'totalPoints', title: '🏆 Poäng' },
  { value: 'beers', title: '🍻 Öl' },
  { value: 'kr', title: '💸 Skuld' }
];

class Home extends Component {
  state = { currentRoute: 'leaderboard', sorting: 'totalPoints' }

  changeRoute = (currentRoute) => {
    const config = animations.layout.easeInEaseOut
    LayoutAnimation.configureNext(config)
    this.setState({currentRoute})
  }

  changeSort = (sorting) => {
    const config = animations.layout.easeInEaseOut
    LayoutAnimation.configureNext(config)
    this.setState({sorting})
  }

  render() {
    if (this.props.data.loading)
      return <Loading text="Laddar ledartavlan..." />

    const { user, data } = this.props;
    const { loading, leaderboard, events } = data;
    const { currentRoute, sorting } = this.state;

    const nonEmptyLeaderboard = leaderboard.filter(sl => sl.eventCount !== 0).length === 0;



    let sortedLeaderboard;
    if(sorting === 'beers') {
      sortedLeaderboard = leaderboard.slice().sort((a, b) => b.totalBeers - a.totalBeers);
      sortedLeaderboard = ranked(sortedLeaderboard, 'beerPos', 'totalBeers')
    } else if(sorting === 'kr') {
      sortedLeaderboard = leaderboard.slice().sort((a, b) => a.totalKr - b.totalKr);
      sortedLeaderboard = ranked(sortedLeaderboard, 'krPos', 'totalKr')
    } else {
      sortedLeaderboard = leaderboard.slice().sort((a, b) => a.position - b.position);
    }

    return(
      <View style={styles.container}>
        { nonEmptyLeaderboard
          ? <EmptyState text="Inga rundor spelade ännu" />
          :
            <View style={styles.container}>
              { currentRoute === 'leaderboard'
                ?
                  <View style={styles.container}>
                    <Tabs
                      currentRoute={sorting}
                      onChange={(sort) => this.changeSort(sort)}
                      tabs={leaderboardTabs}
                    />
                    <ListView
                      enableEmptySections={true}
                      initialListSize={30}
                      dataSource={ds.cloneWithRows(sortedLeaderboard)}
                      renderRow={(rowData) =>
                        <LeaderboardCard currentUserId={user.id} data={rowData} sorting={sorting} />
                      }
                    />
                  </View>
                : <ListView
                    enableEmptySections={true}
                    initialListSize={100}
                    dataSource={ds.cloneWithRows(events)}
                    renderRow={(rowData) => <EventCard event={rowData} />}
                  />
              }
              <Tabs
                currentRoute={currentRoute}
                onChange={(route) => this.changeRoute(route)}
                tabs={viewTabs}
                bottom
              />
            </View>
        }
      </View>
    )
  }
}

const animations = {
  layout: {
    easeInEaseOut: {
      duration: 260,
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


const seasonsQuery = gql`
query seasonsQuery($currentSeasonId: ID!) {
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
  events: allEvents(
    orderBy: startsAt_DESC, filter: { season: { id: $currentSeasonId }}
  ) {
    id
    status
    startsAt
    course
    scoringType
    teamEvent
    oldId
  }
}
`

export default graphql(seasonsQuery, {
  options: ({ currentSeasonId }) => ({ variables: {currentSeasonId}})
})(Home);
