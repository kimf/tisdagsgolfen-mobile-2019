import React, { Component } from "react";
import { LayoutAnimation } from "react-native";
import WeekPicker from "./WeekPicker";
import EventView from "./EventView";
import FinalWeek from "./FinalWeek";
import { seasonShape } from "../../_propTypes";
import { linear } from "../../animations";
const withChangeSort = WrappedWeek =>
  class WrappedWithChangeSort extends Component {
    state = { sorting: "totalPoints" };
    changeSort = sorting => {
      LayoutAnimation.configureNext(linear);
      this.setState(state => ({ ...state, sorting }));
    };
    render() {
      const { sorting } = this.state;
      return (
        <WrappedWeek
          sorting={sorting}
          changeSort={this.changeSort}
          {...this.props}
        />
      );
    }
  };
type WeekViewProps = {
  currentUserId?: any,
  eventId: any,
  eventIndex: any,
  sorting: any,
  season: any,
  reversedEventIds: string[],
  changeWeek: any,
  changeSort: any
};
const WeekView: React.SFC<WeekViewProps> = ({
  currentUserId,
  eventId,
  eventIndex,
  sorting,
  season,
  reversedEventIds,
  changeWeek,
  changeSort
}) => [
  <WeekPicker
    key={`weekPicker_${season.id}`}
    weeks={reversedEventIds}
    currentId={eventId}
    onChangeWeek={changeWeek}
  />,
  eventId === "final" ? (
    <FinalWeek key={`finalWeek_${eventId}`} season={season} />
  ) : (
    <EventView
      key={`eventView_${eventId}`}
      seasonId={season.id}
      currentUserId={currentUserId}
      sorting={sorting}
      eventId={eventId}
      eventIndex={eventIndex}
      showSorter={eventId !== "final" && parseInt(season.name, 10) > 2015}
      changeSort={changeSort}
    />
  )
];
export default withChangeSort(WeekView);
