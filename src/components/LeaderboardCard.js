'use strict';

import React, {Component} from "react";
import { Text, View, LayoutAnimation, TouchableOpacity } from "react-native";

import styles from '../styles';

export default class LeaderboardCard extends Component {
  constructor(props) {
    super(props);

    const { data: player, currentUserId } = props;
    if(player.position < player.previousPosition) {
      this.up_or_down = <Text style={{color: 'green'}}>⇡{player.position - player.previousPosition}</Text>;
    } else if(player.position > player.previousPosition) {
      this.up_or_down = <Text style={{color: 'red'}}>⇣ {player.previousPosition - player.position}</Text>;
    }

    this.currentUserStyle = player.user.id === currentUserId ? {backgroundColor: '#feb'} : null;
  }

  render() {
    const { data } = this.props;
    const player = data.user;
    if(data.eventCount < 1) {
      return null;
    } else {
      const data = this.props.data;
      return(
        <TouchableOpacity activeOpacity={0.7}>
          <View key={data.id} style={[styles.listrow, this.currentUserStyle]}>
            <View style={styles.position}>
              <Text style={{flex: 1, fontWeight: 'bold', color: '#777'}}>{data.position}</Text>
               {this.up_or_down}
            </View>
            <View style={styles.cardTitle}>
              <Text style={styles.name}>{player.firstName} {player.lastName}</Text>
              <Text style={styles.meta}>{data.eventCount} Rundor - Genomsnitt: {data.averagePoints} poäng</Text>
            </View>
            <Text style={styles.points}>{data.totalPoints} p</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
}
