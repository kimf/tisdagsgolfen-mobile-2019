import React, { Component } from "react";
import { FlatList } from "react-native";
import { LeaderboardPlayer } from "../../types/userTypes";
import { ranked } from "../../utils";
import EmptyState from "../shared/EmptyState";
import LeaderboardCard from "./LeaderboardCard";
interface LeaderboardProps {
  seasonId: string;
  eventId: string;
  players: LeaderboardPlayer[];
  currentUserId?: string;
  sorting: string;
}
class Leaderboard extends Component<LeaderboardProps, {}> {
  public render() {
    const { sorting = "totalPoints", players, currentUserId, seasonId, eventId } = this.props;
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
    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0;
    if (emptyLeaderboard) {
      return <EmptyState text="Inga rundor spelade ännu" />;
    }
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={10}
        data={sortedPlayers}
        renderItem={({ item }) => (
          <LeaderboardCard currentUserId={currentUserId} player={item} sorting={sorting} />
        )}
        keyExtractor={player => `l_${seasonId}_${eventId}_${player.id}`}
      />
    );
  }
}
export default Leaderboard;
