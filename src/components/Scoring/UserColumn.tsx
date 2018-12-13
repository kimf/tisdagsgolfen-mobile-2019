import React from "react";
import { View } from "react-native";

import { colors } from "../../styles";
import TGText from "../shared/TGText";

interface Props {
  item: { users: [{ firstName: string }] };
  scoreItem: {
    extraStrokes: number;
  };
  flex?: number;
}

const UserColumn = ({ item, scoreItem, flex = 3 }: Props) => {
  const name = item.users.map(p => p.firstName).join(", ");

  return (
    <View
      style={{
        flex,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20,
      }}>
      <TGText style={{ fontWeight: "bold", lineHeight: 24, fontSize: 14 }}>{name}</TGText>
      <TGText style={{ color: colors.muted, fontSize: 12 }}>
        {scoreItem.extraStrokes} extraslag
      </TGText>
    </View>
  );
};

export default UserColumn;
