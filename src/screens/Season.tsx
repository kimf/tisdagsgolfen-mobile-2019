import React, { Component } from "react";
import { Animated, Easing, LayoutAnimation, View } from "react-native";
import { linear } from "../animations";
import FinalWeek from "../components/Season/FinalWeek";
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
}

class Season extends Component<SeasonProps, SeasonState> {
  public static navigationOptions = {
    header: null,
    headerBackTitle: "Tisdagsgolfen",
  };
  public state = { seasonId: null };
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

  public render() {
    const {
      screenProps: { currentUser, activeScoringSession, seasons },
    } = this.props;
    const { seasonId } = this.state;
    const season = seasonId ? seasons.find(s => s.id === seasonId) : seasons[2];

    if (!season) {
      return null;
    }

    const seasonPickerPos = this.seasonPickerPos.interpolate({
      inputRange: [TOP, BOTTOM],
      outputRange: [BOTTOM, TOP],
      extrapolate: "clamp",
    });

    const currentUserId = currentUser ? currentUser.id : null;
    const { eventIds } = season;
    const eventId = eventIds && eventIds.length > 0 ? eventIds.reverse()[0] : null;

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
        {/* {season.closed && (
          <FinalWeek
            key={`finalWeek_${season.id}`}
            winner={season.winner || ""}
            finalInfo={season.finalInfo || ""}
            photo={season.photo || ""}
          />
        )} */}
        {eventId && (
          <WeekView
            {...{
              currentUserId,
              eventId,
              season,
            }}
          />
        )}
        {!eventId && <EmptyState text="Inga spelade rundor ännu" />}
      </View>
    );
  }
}
export default Season;
