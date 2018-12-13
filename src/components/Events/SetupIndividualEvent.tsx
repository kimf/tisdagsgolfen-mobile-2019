import React from "react";
import { FlatList, View } from "react-native";

import styles from "../../styles";
import { Player } from "../../types/userTypes";
import EventSetupPlayingCard from "../Scoring/EventSetupPlayingCard";
import TopButton from "../shared/TopButton";

interface Props {
  openAddPlayer: () => void;
  playing: Player[];
  onRemove: (player: Player) => void;
  onChangeStrokes: (player: Player, strokes: number) => void;
}

const SetupIndividualEvent = ({ openAddPlayer, playing, onRemove, onChangeStrokes }: Props) => (
  <View style={styles.container}>
    <TopButton title="+ LÄGG TILL SPELARE" onPress={openAddPlayer} />
    <FlatList
      data={playing}
      renderItem={({ item }) => (
        <EventSetupPlayingCard
          item={item}
          {...{
            onRemove,
            onChangeStrokes,
            teamEvent: false,
          }}
        />
      )}
      keyExtractor={item => `setup_pl_${item.id}`}
    />
  </View>
);

export default SetupIndividualEvent;
