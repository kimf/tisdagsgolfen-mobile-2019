import React from "react";
import { Image, View } from "react-native";

import TGText from "../shared/TGText";
import TouchableView from "../shared/TouchableView";

import { colors, NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } from "../../styles";

const SeasonHeader = ({ season, togglePicker, goPlay, activeScoringSession }) => (
  <View
    style={{
      backgroundColor: colors.lightGray,
      height: NAVBAR_HEIGHT + STATUS_BAR_HEIGHT,
      padding: 5,
      flexDirection: "row",
      alignContent: "center",
    }}>
    <TouchableView
      style={{
        padding: 10,
        paddingTop: STATUS_BAR_HEIGHT,
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
      }}
      onPress={togglePicker}>
      <TGText
        style={{
          color: colors.dark,
          fontWeight: "bold",
          fontSize: 20,
        }}>
        {season.name}
      </TGText>
      <Image
        style={{
          tintColor: colors.dark,
          resizeMode: "contain",
          height: 18,
          width: 18,
          marginLeft: 5,
        }}
        source={require("../../images/slide-up.png")}
      />
    </TouchableView>
    <TouchableView
      style={{
        padding: 10,
        paddingTop: STATUS_BAR_HEIGHT,
        justifyContent: "center",
      }}
      onPress={goPlay}>
      <TGText
        style={{
          fontWeight: "bold",
          fontSize: 14,
          paddingHorizontal: 10,
          paddingVertical: 5,
          color: activeScoringSession ? colors.darkGreen : colors.blue,
          borderWidth: 0.75,
          borderColor: activeScoringSession ? colors.darkGreen : colors.blue,
        }}
        onPress={goPlay}>
        {activeScoringSession ? "FORTSÄTT RUNDA" : "SPELA GOLF"}
      </TGText>
    </TouchableView>
  </View>
);

export default SeasonHeader;
