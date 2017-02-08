import React, { Component, PropTypes } from "react";
import { Switch, Route, withRouter } from 'react-router-native'
import { View } from "react-native";

import Leaderboard from './Leaderboard';
import EventList from './EventList';
import Tabs from './Tabs';
import styles from '../styles';

const viewTabs = [
  { value: '/', icon: '🏆', title: 'Ledartavla' },
  { value: '/events', icon: '🗓', title: 'Rundor' }
];

const Season = ({user, season, events, currentPath, replaceRoute}) => (
  <View style={styles.container}>
    <Switch>
      <Route exact path="/" user={user} items={season.seasonLeaderboards} seasonName={season.name} component={Leaderboard} />
      <Route exact path="/events" user={user} events={season.events} component={EventList} />
    </Switch>
    <Tabs
      currentRoute={currentPath}
      onChange={(path) => replaceRoute(path)}
      tabs={viewTabs}
      bottom
    />
  </View>
)


export default withRouter(Season);

