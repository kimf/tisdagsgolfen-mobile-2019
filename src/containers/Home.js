import React, {Component} from "react";
import {StatusBar, Text, TouchableOpacity, View, RefreshControl, ListView} from "react-native";

import NavigationBar from 'react-native-navbar';

import styles from '../styles';
import LeaderboardCard from '../components/LeaderboardCard';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

// const Home = ({ user, loading, logout }) => {
class Home extends Component {
  constructor(props) {
    super(props);
    let players = [];
    if(props.data && props.data.players) {
      players = props.data.players
    }
    this.state = { dataSource: ds.cloneWithRows(players) }
  }

  reloadLeaderboard = () => {
    console.warn('not yet implemented')
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data && nextProps.data.players !== this.props.data.players) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.data.players)
      })
    }
  }

  render() {
    if (this.props.loading)
      return <Text>Loading</Text>

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

export default Home
