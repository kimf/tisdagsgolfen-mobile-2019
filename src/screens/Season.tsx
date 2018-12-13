import React, { Component } from "react";
import { Animated, Easing, LayoutAnimation, View } from "react-native";
import { linear } from "../animations";
import SeasonHeader from "../components/Season/SeasonHeader";
import SeasonPicker from "../components/Season/SeasonPicker";
import WeekView from "../components/Season/WeekView";
import EmptyState from "../components/shared/EmptyState";
import styles, { deviceHeight } from "../styles";
import { CurrentUser, ScoringSession, Season as SeasonType } from "../types/userTypes";

const TOP = -deviceHeight;
const BOTTOM = 0;

interface SeasonProps {
  screenProps: {
    currentUser: CurrentUser;
    activeScoringSession: ScoringSession;
    seasons: SeasonType[];
  };
  navigation: {
    navigate: any;
  };
}
interface SeasonState {
  seasonId: string | null;
  eventId: string | null;
}
// TODO, break out this into smaller pieces
class Season extends Component<SeasonProps, SeasonState> {
  public static navigationOptions = {
    header: null,
    headerBackTitle: "Tisdagsgolfen",
  };
  public state = {
    seasonId: null,
    eventId: null,
  };
  public seasonPickerPos = new Animated.Value(0);
  public open = false;
  public onChangeSeason = seasonId => {
    this.setState(state => ({
      ...state,
      seasonId,
      eventId: null,
    }));
    this.toggleSeasonpicker(false);
  };
  public toggleSeasonpicker = open => {
    this.open = open;
    Animated.timing(this.seasonPickerPos, {
      toValue: open ? TOP : BOTTOM,
      easing: Easing.ease,
      duration: 450,
      useNativeDriver: true,
    }).start();
  };
  public showActiveScoringSession = () => {
    const scoringSessionId = this.props.screenProps.activeScoringSession.id;
    this.props.navigation.navigate("ScoreEvent", { scoringSessionId });
  };
  public gotoPlay = () => {
    this.props.navigation.navigate("CoursePickerScreen");
  };
  public changeWeek = eventId => {
    LayoutAnimation.configureNext(linear);
    this.setState(state => ({ ...state, eventId }));
  };
  public render() {
    const {
      screenProps: { currentUser, activeScoringSession, seasons },
    } = this.props;
    const { seasonId } = this.state;
    const season = seasonId ? seasons.find(s => s.id === seasonId) : seasons[0];

    if (!season) {
      return null;
    }

    const { eventIds } = season;

    const currentUserId = currentUser ? currentUser.id : null;
    let weekProps;
    let hasEvents = false;
    if (eventIds && eventIds.length > 0) {
      hasEvents = true;
      const reversedEventIds = (season.closed ? [...eventIds, "final"] : [...eventIds])
        .map((id, index) => ({ id: `${id}`, index: `${index + 1}` }))
        .reverse();
      const eventId = this.state.eventId || reversedEventIds[0].id;
      // @ts-ignore
      const eventIndex = reversedEventIds.find(id => id.id === eventId).index;
      weekProps = {
        currentUserId,
        eventId,
        eventIndex,
        season,
        reversedEventIds,
      };
    }
    const seasonPickerPos = this.seasonPickerPos.interpolate({
      inputRange: [TOP, BOTTOM],
      outputRange: [BOTTOM, TOP],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.container}>
        <SeasonPicker
          seasons={seasons}
          onChangeSeason={this.onChangeSeason}
          position={seasonPickerPos}
        />

        <SeasonHeader
          season={season}
          togglePicker={() => this.toggleSeasonpicker(!this.open)}
          goPlay={activeScoringSession ? this.showActiveScoringSession : this.gotoPlay}
          activeScoringSession={activeScoringSession}
        />

        {hasEvents ? (
          <WeekView {...weekProps} changeWeek={this.changeWeek} />
        ) : (
          <EmptyState text="Inga spelade rundor ännu" />
        )}
      </View>
    );
  }
}
export default Season;
