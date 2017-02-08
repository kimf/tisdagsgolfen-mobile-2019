'use strict';

import React, {Component} from "react";
import { Text, View, LayoutAnimation, TouchableOpacity } from "react-native";

import styles from '../styles';

const LeaderboardCard = ({data, currentUserId, sorting}) => {
  let pointText;
  let pointValue;
  let up_or_down;
  let position;

  if(sorting === 'beers') {
    pointValue = data.totalBeers;
    pointText = 'st'
    console.log(data);
    position = data.beerPos;
  } else if(sorting === 'kr') {
    pointValue = data.totalKr;
    pointText = 'kr';
    position = data.krPos;
  } else {
    pointValue = data.totalPoints;
    pointText = 'p';
    position = data.position;
    if(data.position < data.previousPosition) {
      up_or_down = <Text style={{color: 'green'}}>⇡{data.position - data.previousPosition}</Text>;
    } else if(data.position > data.previousPosition) {
      up_or_down = <Text style={{color: 'red'}}>⇣ {data.previousPosition - data.position}</Text>;
    }
  }

  const player = data.user;
  const averagePoints = data.averagePoints.toLocaleString('sv', {maximumFractionDigits: 1, useGrouping:false})

  const currentUserStyle = player.id === currentUserId ? {backgroundColor: '#feb'} : null;

  if(data.eventCount < 1) {
    return null;
  } else {
    return(
      <TouchableOpacity activeOpacity={0.5}>
        <View key={data.id} style={[styles.listrow, currentUserStyle]}>
          <View style={styles.position}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#777'}}>{position}</Text>
             {up_or_down}
          </View>
          <View style={styles.cardTitle}>
            <Text style={styles.name}>{player.firstName} {player.lastName}</Text>
            <Text style={styles.metaLarger}>
              {data.eventCount} Rundor.
              { sorting === 'totalPoints' ? ` Snitt: ${averagePoints}p` : null }
            </Text>
            { sorting === 'totalPoints' ? <Text style={styles.meta}>Top 5: {data.top5Points.join(' | ')}</Text> : null }
          </View>
          <Text style={styles.points}>{`${pointValue} ${pointText}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


export default LeaderboardCard;
