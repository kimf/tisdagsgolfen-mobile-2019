'use strict';

import React, {Component} from "react";
import { Text, View, LayoutAnimation, TouchableOpacity } from "react-native";

import styles from '../styles';

const LeaderboardCard = ({data, currentUserId}) => {
  const player = data.user;
  const averagePoints = data.averagePoints.toLocaleString('sv', {maximumFractionDigits: 1, useGrouping:false})

  let up_or_down;
  if(player.position < player.previousPosition) {
    up_or_down = <Text style={{color: 'green'}}>⇡{player.position - player.previousPosition}</Text>;
  } else if(player.position > player.previousPosition) {
    up_or_down = <Text style={{color: 'red'}}>⇣ {player.previousPosition - player.position}</Text>;
  }

  const currentUserStyle = player.id === currentUserId ? {backgroundColor: '#feb'} : null;

  if(data.eventCount < 1) {
    return null;
  } else {
    return(
      <TouchableOpacity activeOpacity={0.5}>
        <View key={data.id} style={[styles.listrow, currentUserStyle]}>
          <View style={styles.position}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#777'}}>{data.position}</Text>
             {up_or_down}
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.name}>{player.firstName} {player.lastName}</Text>
            <Text style={styles.metaLarger}>{data.eventCount} Rundor. Genomsnitt: {averagePoints}p</Text>
            <Text style={styles.meta}>Top 5: {data.top5Points.join(' | ')}</Text>
          </View>
          <Text style={styles.points}>{data.totalPoints} p</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


export default LeaderboardCard;
