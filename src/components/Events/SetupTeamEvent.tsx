import React from "react";
import { FlatList, View } from "react-native";

import styles from "../../styles";
import EventSetupPlayingCard from "../Scoring/EventSetupPlayingCard";
import TopButton from "../shared/TopButton";

const SetupTeamEvent = ({
  playing,
  onRemove,
  onAddTeam,
  onChangeStrokes,
  onRemovePlayerFromTeam,
  openAddPlayer,
}) => (
  <View style={styles.container}>
    <TopButton title="+ LÄGG TILL LAG" onPress={onAddTeam} />
    <FlatList
      data={playing}
      renderItem={({ item }) => (
        <EventSetupPlayingCard
          item={item}
          {...{
            onRemove,
            onChangeStrokes,
            onRemovePlayerFromTeam,
            onAddPlayerToTeam: () => openAddPlayer(item),
            teamEvent: true,
          }}
        />
      )}
      keyExtractor={item => `setup_team_${item.id}`}
    />
  </View>
);

export default SetupTeamEvent;
