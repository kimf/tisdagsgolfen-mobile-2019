import React from "react";
import { View } from "react-native";

import { colors } from "../../styles";
import TGText from "../shared/TGText";

type OnChange = (tabValue: string) => void;

interface Tab {
  value: string;
  icon: string;
}

const tabs = [
  { value: "totalPoints", icon: "🥇" },
  { value: "beers", icon: "🍻" },
  { value: "kr", icon: "💸" },
] as Tab[];

const SorterItem = ({
  tab,
  isCurrent,
  onChange,
}: {
  tab: Tab;
  isCurrent: boolean;
  onChange: OnChange;
}) => (
  <TGText
    onPress={() => onChange(tab.value)}
    style={{
      padding: 10,
      fontSize: 24,
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

const Sorter = ({ current, onChange }: { current: string; onChange: OnChange }) => (
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
