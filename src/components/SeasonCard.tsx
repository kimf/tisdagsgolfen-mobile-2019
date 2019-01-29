import React from "react";
import { ImageBackground, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import { colors } from "../styles";
import TouchableView from "./shared/TouchableView";

const cardStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
  height: "100%",
  backgroundColor: colors.dark,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,
} as ViewStyle;

interface Props {
  name: string;
}

const Name = ({ name }: Props) => (
  <Text
    style={{
      padding: 10,
      textShadowColor: colors.green,
      textShadowOffset: { width: 0, height: 2 },
      elevation: 4,
      backgroundColor: "transparent",
      color: colors.white,
      fontSize: 24,
    }}>
    {name}
  </Text>
);

interface SeasonCardProps {
  onPress: () => void;
  name: string;
  photo: string | null;
}

const SeasonCard = ({ onPress, photo, name }: SeasonCardProps) => (
  <TouchableView
    onPress={onPress}
    style={{
      flex: 1,
      margin: 5,
      borderRadius: 14,
      justifyContent: "center",
    }}>
    <View style={cardStyle}>
      {photo && (
        <ImageBackground
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
          source={{ uri: photo }}
          resizeMode="cover">
          <Name name={name} />
        </ImageBackground>
      )}
      {!photo && <Name name={name} />}
    </View>
  </TouchableView>
);

export default SeasonCard;
