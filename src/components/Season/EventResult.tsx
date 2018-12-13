import React, { Component } from "react";
import { FlatList } from "react-native";
import { ranked } from "../../utils";
import EventLeaderboardCard from "../Events/EventLeaderboardCard";
interface EventResultProps {
  currentUserId?: any,
  scoringType: any,
  sorting: any,
  players: any[],
  seasonId: any,
  eventId: any
}
class EventResult extends Component<EventResultProps, {}> {
  public static defaultProps = {
    currentUserId: null
  };
  public static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerVisible: true,
    tabBarVisible: false
  });
  public render() {
    const {
      sorting,
      currentUserId,
      scoringType,
      players,
      seasonId,
      eventId
    } = this.props;
    let sortedPlayers = null;
    let sorted = null;
    if (sorting === "beers") {
      sorted = players.slice().sort((a, b) => b.beers - a.beers);
      sortedPlayers = ranked(sorted, "beerPos", "beers");
    } else if (sorting === "kr") {
      sorted = players.slice().sort((a, b) => a.kr - b.kr);
      sortedPlayers = ranked(sorted, "krPos", "kr");
    } else {
      sortedPlayers = players.slice().sort((a, b) => a.position - b.position);
    }
    return (
      <FlatList
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        initialListSize={10}
        data={sortedPlayers}
        renderItem={({ item }) => (
          <EventLeaderboardCard
            key={`l_${currentUserId}_${seasonId}`}
            scoringType={scoringType}
            currentUserId={currentUserId}
            data={item}
            sorting={sorting}
          />
        )}
        keyExtractor={player => `l_${seasonId}_${eventId}_${player.id}`}
      />
    );
  }
}
export default EventResult;
