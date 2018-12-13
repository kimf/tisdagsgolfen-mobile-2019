import React, { Component } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Header from "../shared/Header";
import Tabs from "../shared/Tabs";
import TopButton from "../shared/TopButton";
import ScorecardHeaderRow from "./ScorecardHeaderRow";
import ScoringLeaderboardCard from "./ScoringLeaderboardCard";

import { withLiveLeaderboardQuery } from "../../graph/queries/liveLeaderboardQuery";
import { colors, NAVBAR_HEIGHT } from "../../styles";
import { massageIntoLeaderboard, rankBySorting } from "../../utils";

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
  },
});

interface Props {
  currentUserId: string;
  scoringSessionId: string;
  onClose: () => void;
  scoringType: string;
  showHeader?: boolean;
  showClose?: boolean;
  teamEvent: boolean;
  data: {
    loading: boolean;
    scoringSessions: any[];
  };
}

interface State {
  sorting: string;
}

class ScoringLeaderboard extends Component<Props, State> {
  public state = { sorting: "totalPoints" };
  public listView: FlatList<any> | null = null;

  public changeSort = sorting => {
    if (this.listView) {
      this.listView.scrollToIndex({ index: 0 });
    }

    this.setState({ sorting });
  };

  public render() {
    const {
      data,
      scoringSessionId,
      currentUserId,
      onClose = null,
      showClose = true,
      showHeader = false,
      scoringType,
      teamEvent,
    } = this.props;
    const { sorting } = this.state;

    let sortedPlayers: any[] = [];
    if (data.scoringSessions && data.scoringSessions.length > 0) {
      const players = massageIntoLeaderboard(data.scoringSessions, teamEvent);
      sortedPlayers = rankBySorting(players, sorting, teamEvent, scoringType);
    }

    // TODO: Show tabs for teamEvents when you figured out how to solve the beers part
    return (
      <View style={{ flex: 1 }}>
        {showHeader ? <Header title="Ledartavla" /> : null}
        <View style={[styles.inner, { marginTop: showHeader ? NAVBAR_HEIGHT : 0 }]}>
          {teamEvent ? null : (
            <Tabs
              teamEvent={teamEvent}
              currentRoute={sorting}
              onChange={sort => this.changeSort(sort)}
              scoringType={scoringType}
            />
          )}

          {sorting === "totalPoints" ? (
            <ScorecardHeaderRow scoring={false} scoringType={scoringType} teamEvent={teamEvent} />
          ) : null}

          <FlatList
            removeClippedSubviews={false}
            data={sortedPlayers}
            ref={ref => {
              this.listView = ref;
            }}
            renderItem={({ item }) => (
              <ScoringLeaderboardCard
                key={`l_${currentUserId}`}
                scoringType={scoringType}
                currentUserId={currentUserId}
                player={item}
                sorting={sorting}
                teamEvent={teamEvent}
              />
            )}
            keyExtractor={item => `leaderboardPlayer_${item.id}}`}
          />
        </View>
        {showClose ? (
          <TopButton backgroundColor={colors.red} title="STÄNG" onPress={() => onClose()} />
        ) : null}
      </View>
    );
  }
}

export default withLiveLeaderboardQuery(ScoringLeaderboard);
