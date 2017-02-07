import React, { Component, PropTypes } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ListView
} from "react-native";

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../styles';
import Loading from '../components/Loading';
import LeaderboardCard from '../components/LeaderboardCard';
import EmptyState from '../components/EmptyState';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Home extends Component {
  reloadLeaderboard = () => console.warn('not yet implemented');

  render() {
    if (this.props.data.loading)
      return <Loading text="Laddar ledartavlan..." />

    const { user, data } = this.props;
    const { loading, leaderboard } = data;

    const nonEmptyLeaderboard = leaderboard.filter(sl => sl.eventCount !== 0).length === 0;

    return(
      <View style={styles.container}>
        { nonEmptyLeaderboard
          ? <EmptyState text="Inga rundor spelade ännu" />
          : <ListView
              enableEmptySections={true}
              initialListSize={8}
              dataSource={ds.cloneWithRows(leaderboard)}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.reloadLeaderboard}
                  tintColor="#0091e5"
                  title="Uppdaterar..."
                  titleColor="#0091e5"
                  progressBackgroundColor="#FF2179"
                />
              }
              renderRow={(rowData) => <LeaderboardCard currentUserId={user.id} data={rowData} />}
            />
        }
      </View>
    )
  }
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
}
`

export default graphql(seasonsQuery, {
  options: ({ currentSeasonId }) => ({ variables: {currentSeasonId}})
})(Home);
