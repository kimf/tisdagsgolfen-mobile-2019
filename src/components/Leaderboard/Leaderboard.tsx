import React from "react";
import { View } from "react-native";

import { LeaderboardPlayer } from "../../types/userTypes";
import { ranked } from "../../utils";
import LeaderboardCard from "./LeaderboardCard";

interface LeaderboardProps {
  seasonId: string;
  eventId?: string | null;
  players: LeaderboardPlayer[];
  currentUserId: string | null;
  sorting: string;
}

const Leaderboard = ({
  sorting = "totalPoints",
  players,
  currentUserId,
  seasonId,
  eventId,
}: LeaderboardProps) => {
  let sortedPlayers: LeaderboardPlayer[] | null = null;
  if (sorting === "beers") {
    const sorted = players.slice().sort((a, b) => b.beers - a.beers);
    sortedPlayers = ranked(sorted, "beerPos", "beers");
  } else if (sorting === "kr") {
    const sorted = players.slice().sort((a, b) => a.totalKr - b.totalKr);
    sortedPlayers = ranked(sorted, "krPos", "totalKr");
  } else {
    sortedPlayers = players.slice().sort((a, b) => a.position - b.position);
  }

  return (
    <View style={{ flex: 1 }}>
      {sortedPlayers.map(item => (
        <LeaderboardCard
          key={`l_${seasonId}_${eventId}_${item.id}`}
          currentUserId={currentUserId}
          player={item}
          sorting={sorting}
        />
      ))}
    </View>
  );
};

export default Leaderboard;
