import React, { Component } from "react";
import { View } from "react-native";
import { withEventQuery } from "../../graph/queries/eventQuery";
import EventHeader from "../Events/EventHeader";
import Leaderboard from "../Leaderboard/Leaderboard";

import EventViewLoader from "./EventViewLoader";
import Sorter from "./Sorter";

interface EventViewProps {
  eventId: any;
  eventIndex: any;
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
      sorting,
      showSorter,
      changeSort,
      data: { loading, event },
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
      </View>
    );
  }
}
export default withEventQuery(EventView);
