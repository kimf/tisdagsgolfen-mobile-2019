import React, { Component } from "react";
import { FlatList, Image, View } from "react-native";
import TGText from "../../components/shared/TGText";
import { withUserQuery } from "../../graph/queries/userQuery";
import styles, { colors } from "../../styles";

const defaultAvatar = require("../../images/defaultavatar.png");
interface NewPlayerProps {
  data?: {
    loading?: any;
    players?: any[];
  };
  navigation: {
    state: {
      params?: {
        team?: {
          id: any;
        };
        addedIds: any[];
        onAdd: any;
      };
    };
  };
}
class NewPlayer extends Component<NewPlayerProps, {}> {
  public static navigationOptions = {
    title: "Lägg till spelare",
    tabBarVisible: false,
  };
  public static defaultProps = {
    data: {
      loading: true,
      players: [],
    },
  };
  public addPlayer = (player, team = null) => {
    this.props.navigation.state.params.onAdd(player, team);
    this.props.navigation.goBack();
  };
  public render() {
    const { data } = this.props;
    const { team, addedIds } = this.props.navigation.state.params;
    if (data.loading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <FlatList
          removeClippedSubviews={false}
          initialListSize={10}
          data={data.players}
          renderItem={({ item }) => {
            const isPlaying = addedIds.includes(item.id);
            const photoSrc = item.photo ? { uri: item.photo } : defaultAvatar;
            return !isPlaying ? (
              <TGText
                key={`setup_player_row_${item.id}`}
                onPress={() => this.addPlayer(item, team)}
                viewStyle={{
                  borderBottomWidth: 1,
                  borderColor: colors.lightGray,
                  flexDirection: "row",
                  padding: 15,
                }}
                style={{ fontSize: 18, fontWeight: "bold" }}>
                <Image style={styles.cardImage} source={photoSrc} resizeMode="cover" />
                {item.firstName} {item.lastName}
              </TGText>
            ) : null;
          }}
          keyExtractor={item => `setup_player_row_${item.id}`}
          enableEmptySections={true}
        />
      </View>
    );
  }
}
export default withUserQuery(NewPlayer);
