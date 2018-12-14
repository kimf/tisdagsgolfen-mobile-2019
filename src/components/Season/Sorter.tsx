import React from "react";
import { View } from "react-native";

import { colors } from "../../styles";
import TGText from "../shared/TGText";

const tabs = [
  { value: "totalPoints", icon: "🥇" },
  { value: "beers", icon: "🍻" },
  { value: "kr", icon: "💸" },
];

const SorterItem = ({ tab, isCurrent, onChange }) => (
  <TGText
    onPress={() => onChange(tab.value)}
    style={{
      padding: 5,
      fontSize: 20,
      opacity: isCurrent ? 1 : 0.75,
    }}
    viewStyle={{
      marginLeft: 5,
      borderRadius: 10,
      backgroundColor: isCurrent ? "rgba(255, 255, 255, 0.35)" : "transparent",
    }}>
    {tab.icon}
  </TGText>
);

const Sorter = ({ current, onChange }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: colors.lightGray,
      paddingRight: 10,
    }}>
    {tabs.map(tab => (
      <SorterItem key={tab.value} tab={tab} isCurrent={tab.value === current} onChange={onChange} />
    ))}
  </View>
);

export default Sorter;