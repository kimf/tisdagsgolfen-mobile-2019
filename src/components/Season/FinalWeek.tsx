import React from "react";
import { Image, View } from "react-native";
import { colors } from "../../styles";
import TGText from "../shared/TGText";
interface FinalWeekProps {
  winner: string;
  photo: string;
  finalInfo: string;
}
const FinalWeek: React.SFC<FinalWeekProps> = ({ winner, photo, finalInfo }) => (
  <View style={{ flex: 1 }}>
    <View
      key="finalWeekHeader"
      style={{
        flexDirection: "row",
        padding: 20,
        backgroundColor: colors.darkGreen,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Image
        source={require("../../images/trophy-filled.png")}
        style={{ tintColor: colors.yellow, height: 25, width: 25 }}
      />
      <TGText style={{ marginLeft: 10, color: colors.white, fontWeight: "bold" }}>
        Grattis {winner}
      </TGText>
    </View>
    <Image
      key="winnerPhoto"
      style={{ width: "100%", height: 200 }}
      source={{ uri: photo, cache: "force-cache" }}
      resizeMode="cover"
    />
    <TGText key="finaleInfo" style={{ padding: 20, fontSize: 20 }}>
      {finalInfo}
    </TGText>
  </View>
);
export default FinalWeek;
