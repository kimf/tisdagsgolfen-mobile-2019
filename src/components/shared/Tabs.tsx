import React from "react";
import { View } from "react-native";
import { colors } from "../../styles";
import Tab from "./Tab";
interface TabsProps {
  currentRoute: any;
  onChange: any;
  teamEvent?: any;
  scoringType?: any;
}
const Tabs: React.SFC<TabsProps> = ({
  currentRoute,
  onChange,
  scoringType = "points",
  teamEvent = false,
}) => {
  const strokes = scoringType === "strokes";
  const tabs = [
    { value: "totalPoints", icon: "🥇", title: strokes ? "Slag" : "Poäng" },
    { value: "beers", icon: "🍻", title: "Öl" },
  ];
  if (!teamEvent) {
    tabs.push({ value: "kr", icon: "💸", title: "Skuld" });
  }
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        padding: 10,
        backgroundColor: colors.lightGray,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
      key="tabs_sorting">
      {tabs.map(t => (
        <Tab
          key={`tab_${t.value}`}
          tab={t}
          isCurrent={currentRoute === t.value}
          onChange={onChange}
        />
      ))}
    </View>
  );
};

export default Tabs;
