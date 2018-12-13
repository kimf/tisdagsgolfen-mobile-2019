import React from "react";
import TGText from "./TGText";
import { colors } from "../../styles";
type TabProps = {
  tab: {
    value: any,
    icon: any,
    title: any
  },
  isCurrent: any,
  onChange: any
};
const Tab: React.SFC<TabProps> = ({ tab, isCurrent, onChange }) => {
  const text = `${tab.icon} ${tab.title}`;
  return (
    <TGText
      key={tab.title}
      viewStyle={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      }}
      style={{
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 12,
        color: isCurrent ? colors.blue : colors.dark,
        fontWeight: isCurrent ? "bold" : "normal"
      }}
      onPress={() => onChange(tab.value)}
    >
      {text}
    </TGText>
  );
};
export default Tab;
