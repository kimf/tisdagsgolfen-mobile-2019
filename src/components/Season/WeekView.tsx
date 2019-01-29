import React, { Component } from "react";
import { LayoutAnimation } from "react-native";
import { linear } from "../../animations";
import EventView from "./EventView";

interface WeekViewProps {
  currentUserId?: any;
  eventId: any;
  eventIndex: any;
  sorting: any;
  season: any;
  changeSort: any;
}

const WeekView: React.SFC<WeekViewProps> = ({
  currentUserId,
  eventId,
  eventIndex,
  sorting,
  season,
  changeSort,
}) => (
  <EventView
    key={`eventView_${eventId}`}
    seasonId={season.id}
    currentUserId={currentUserId}
    sorting={sorting}
    eventId={eventId}
    eventIndex={eventIndex}
    showSorter={parseInt(season.name, 10) > 2015}
    changeSort={changeSort}
  />
);

const withChangeSort = (WrappedWeek: any) =>
  class WrappedWithChangeSort extends Component {
    public state = { sorting: "totalPoints" };
    public changeSort = sorting => {
      LayoutAnimation.configureNext(linear);
      this.setState(state => ({ ...state, sorting }));
    };
    public render() {
      const { sorting } = this.state;
      return <WrappedWeek sorting={sorting} changeSort={this.changeSort} {...this.props} />;
    }
  };

export default withChangeSort(WeekView);
