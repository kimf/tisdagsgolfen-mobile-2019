import React from "react";
import { Query } from "react-apollo";
import { View } from "react-native";
import { NavigationActions, NavigationScreenProp, StackActions } from "react-navigation";

import { Appbar } from "react-native-paper";
import SeasonCard from "../components/SeasonCard";
import seasonsQuery from "../graph/queries/seasonsQuery";
import { Season } from "../types/userTypes";

interface SeasonPickerProps {
  navigation: NavigationScreenProp<any>;
}

const chunkedSeasons = (myArray: Season[], size: number): Season[][] => {
  const results = [];
  while (myArray.length) {
    // @ts-ignore
    results.push(myArray.splice(0, size));
  }
  return results;
};

const SeasonPicker = ({ navigation }: SeasonPickerProps) => {
  const gotoSeason = (seasonId: string, seasonName: string) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: "Main", params: { seasonId, seasonName } }),
      ],
    });
    navigation.dispatch(resetAction);
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <Query query={seasonsQuery}>
        {({ loading, data }) => {
          if (loading) {
            return null;
          }

          return chunkedSeasons(data.seasons, 2).map((chunk, index) => (
            <View key={index} style={{ flex: 1, flexDirection: "row" }}>
              {chunk.map(season => (
                <SeasonCard
                  key={`SeasonCard_${season.id}`}
                  onPress={() => gotoSeason(season.id, season.name)}
                  photo={season.photo === "" ? null : season.photo}
                  name={season.name}
                />
              ))}
            </View>
          ));
        }}
      </Query>
    </View>
  );
};

SeasonPicker.navigationOptions = (props: SeasonPickerProps) => {
  const title = "Välj säsong";
  return {
    title,
    headerLeft: (
      <Appbar.Action icon="line-style" onPress={() => props.navigation.navigate("SeasonPicker")} />
    ),
  };
};

export default SeasonPicker;
