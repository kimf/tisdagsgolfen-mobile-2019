import React, { Component } from "react";
import { Query } from "react-apollo";
import { LayoutAnimation, ScrollView, View } from "react-native";
import { Appbar } from "react-native-paper";
import { NavigationScreenProp } from "react-navigation";

import { linear } from "../animations";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import EmptyState from "../components/shared/EmptyState";

import FinalWeek from "../components/Season/FinalWeek";
import Sorter from "../components/Season/Sorter";
import Loading from "../components/shared/Loading";
import seasonQuery from "../graph/queries/seasonQuery";
import styles from "../styles";

interface SeasonProps {
  navigation: NavigationScreenProp<{ seasonId: string }>;
}

interface SeasonState {
  sorting: string;
}

class Season extends Component<SeasonProps, SeasonState> {
  public static navigationOptions = (props: SeasonProps) => {
    const name = props.navigation.getParam("seasonName", "");
    return {
      title: `TISDAGSGOLFEN ${name}`,
      headerLeft: (
        <Appbar.Action
          icon="line-style"
          onPress={() => props.navigation.navigate("SeasonPicker")}
        />
      ),
    };
  };

  public state = { sorting: "totalPoints" };
  public changeSort = (sorting: string) => {
    LayoutAnimation.configureNext(linear);
    this.setState(state => ({ ...state, sorting }));
  };

  public render() {
    const { navigation } = this.props;
    const { sorting } = this.state;

    const currentUserId = navigation.getParam("currentUser.id", null);

    const seasonId = navigation.getParam("seasonId", null);

    return (
      <View style={styles.container}>
        <Query query={seasonQuery} variables={{ seasonId }}>
          {({ loading, data }) => {
            if (loading) {
              return <Loading />;
            }

            const { season } = data;

            if (season.leaderboard.length === 0) {
              return <EmptyState text="Inga rundor spelade ännu" />;
            }

            const showSorter = Number(season.name) > 2015;

            return (
              <ScrollView>
                {season.closed && season.winner && season.photo && (
                  <FinalWeek
                    key={`finalWeek_${season.id}`}
                    winner={season.winner}
                    photo={season.photo}
                  />
                )}

                {showSorter && (
                  <Sorter key="weekSortTabs" current={sorting} onChange={this.changeSort} />
                )}

                <Leaderboard
                  seasonId={season.id}
                  sorting={sorting}
                  currentUserId={currentUserId}
                  players={season.leaderboard}
                />
              </ScrollView>
            );
          }}
        </Query>
      </View>
    );
  }
}
export default Season;
