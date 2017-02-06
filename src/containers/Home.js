import React, { Component, PropTypes } from "react";
import {StatusBar, Text, TouchableOpacity, View, RefreshControl, ListView} from "react-native";
import NavigationBar from 'react-native-navbar';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../styles';
import Loading from '../components/Loading';
import LeaderboardCard from '../components/LeaderboardCard';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Home extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      Season: PropTypes.object,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    console.log(props);
    if(props.data && props.data.allSeasonLeaderboards) {
      this.state = { dataSource: ds.cloneWithRows(props.data.allSeasonLeaderboards) }
    } else {
      this.state = { dataSource: ds }
    }
  }

  reloadLeaderboard = () => {
    console.warn('not yet implemented')
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.state);
    if(nextProps.data && nextProps.data.allSeasonLeaderboards) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data.allSeasonLeaderboards)
      });
    }
  }

  render() {
    if (this.props.loading)
      return <Loading text="Laddar ledartavlan..." />

    const { user, loading, logout, scoringEvent } = this.props;

    const titleConfig = { title: 'Tisdagsgolfen', tintColor: 'white' };
    const leftButtonConfig = {
      title: 'Logga ut',
      handler: () => logout(),
      tintColor: 'white'
    };

    let eventBanner;
    // if(scoringEvent && scoringEvent.id) {
    //   eventBanner = (
    //     <TouchableOpacity
    //       style={styles.btn}
    //       onPress={() => navigator.resetTo({ scoreEvent: 1, event: scoringEvent })}>
    //       <Text style={styles.btnLabel}>ÅTERUPPTA SCOREFÖRING</Text>
    //     </TouchableOpacity>
    //   );
    // }

    return(
      <View style={styles.container}>
        <NavigationBar
          style={styles.header}
          statusBar={{style: 'light-content', tintColor: '#0091e5'}}
          title={titleConfig}
          leftButton={leftButtonConfig} />

          {eventBanner}

          <ListView
            enableEmptySections={true}
            initialListSize={8}
            dataSource={this.state.dataSource}
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
      </View>
    )
  }
}


const seasonId = "ciyrzowr1ilua01703ox5507l";


// filter: { season: { id: "ciyrzowr1ilua01703ox5507l" }, eventCount_not: 0 }
const leaderboardQuery = gql`
{
  allSeasonLeaderboards (
    orderBy: position_DESC,
    filter: { season: { id: "${seasonId}" } }
  ) {
    id
    averagePoints
    position
    previousPosition
    totalPoints
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

export default graphql(leaderboardQuery)(Home)
