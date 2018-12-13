import React from "react";
import { Text, View } from "react-native";

import { colors } from "../../styles";
import TouchableView from "../shared/TouchableView";

const cardStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
  height: "100%",
  backgroundColor: colors.semiDark,
};

interface Props {
  name: string;
}

const Name = ({ name }: Props) => (
  <Text
    style={{
      padding: 10,
      textShadowColor: colors.dark,
      textShadowOffset: { width: 2, height: 2 },
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
  photo?: string;
}

const SeasonCard = ({ onPress, photo, name }: SeasonCardProps) => (
  <TouchableView
    onPress={onPress}
    style={{
      flex: 1,
      marginBottom: 10,
    }}>
    <View style={cardStyle}>
      <Name name={name} />
    </View>
  </TouchableView>
);

export default SeasonCard;
