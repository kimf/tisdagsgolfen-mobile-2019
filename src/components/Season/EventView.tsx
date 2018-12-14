import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { eventQueryProps, withEventQuery } from "../../graph/queries/eventQuery";
import { colors, deviceWidth } from "../../styles";
import EventHeader from "../Events/EventHeader";
import Leaderboard from "../Leaderboard/Leaderboard";
import EventResult from "./EventResult";
import EventViewLoader from "./EventViewLoader";
import Sorter from "./Sorter";
const swipeCardStyle = {
  width: deviceWidth - 20,
  padding: 5,
  backgroundColor: "#fff",
  shadowColor: colors.gray,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 2,
  shadowOpacity: 0.5,
  elevation: 5,
  borderRadius: 10,
};
interface EventViewProps {
  currentUserId?: any;
  eventId: any;
  eventIndex: any;
  seasonId: any;
  data: any;
  sorting: any;
  showSorter: any;
  changeSort: any;
}
class EventView extends Component<EventViewProps, {}> {
  public static defaultProps = {
    currentUserId: null,
  };
  public render() {
    const {
      eventId,
      seasonId,
      currentUserId,
      sorting,
      showSorter,
      changeSort,
      data: { loading, event, players },
    } = this.props;
    if (loading) {
      return <EventViewLoader />;
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <EventHeader
            key={`eventHeader_${eventId}`}
            course={event.course}
            teamEvent={event.teamEvent}
            scoringType={event.scoringType}
          />
          {showSorter && (
            <Sorter key="weekSortTabs" current={sorting} onChange={sort => changeSort(sort)} />
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Leaderboard
            sorting={sorting}
            currentUserId={currentUserId}
            players={players}
            seasonId={seasonId}
            eventId={eventId}
          />
        </View>
        {/* <EventResult
            eventId={eventId}
            seasonId={seasonId}
            sorting={sorting}
            currentUserId={currentUserId}
            players={event.leaderboard}
            scoringType={event.scoringType}
          /> */}
      </View>
    );
  }
}
export default withEventQuery(EventView);
