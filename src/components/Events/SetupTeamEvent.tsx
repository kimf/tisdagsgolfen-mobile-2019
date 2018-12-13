import React from "react";
import { FlatList, View } from "react-native";

import styles from "../../styles";
import { Player, Team } from "../../types/userTypes";
import EventSetupPlayingCard from "../Scoring/EventSetupPlayingCard";
import TopButton from "../shared/TopButton";

interface Props {
  playing: Team[];
  onRemove: (player: Player) => void;
  onAddTeam: () => void;
  onChangeStrokes: (player: Player, strokes: number) => void;
  onRemovePlayerFromTeam: (team: Team, player: Player) => void;
  openAddPlayer: (item: Team) => void;
}

const SetupTeamEvent = ({
  playing,
  onRemove,
  onAddTeam,
  onChangeStrokes,
  onRemovePlayerFromTeam,
  openAddPlayer,
}: Props) => (
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
