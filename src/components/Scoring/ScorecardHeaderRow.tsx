import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../styles";
import TGText from "../shared/TGText";
const style = StyleSheet.create({
  view: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    paddingHorizontal: 20,
  },
  text: {
    color: colors.dark,
    paddingVertical: 10,
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
});
interface ScorecardHeaderRowProps {
  teamEvent: any;
  scoring: any;
  scoringType: any;
}
const ScorecardHeaderRow: React.SFC<ScorecardHeaderRowProps> = ({
  teamEvent,
  scoring,
  scoringType,
}) => {
  const puttsHeader = teamEvent ? null : <TGText style={style.text}>PUTT</TGText>;
  const beersHeader = teamEvent ? null : <TGText style={style.text}>ÖL</TGText>;
  const strokes = scoringType === "strokes";
  return (
    <View style={style.view}>
      <TGText style={[style.text, { flex: 3, textAlign: "left", paddingLeft: 0 }]}>SPELARE</TGText>
      <View style={{ flexGrow: 2, flexDirection: "row" }}>
        {beersHeader}
        <TGText style={style.text}>{strokes ? "BRUTTO" : "SLAG"}</TGText>
        {puttsHeader}
        {!scoring && (
          <TGText style={[style.text, { textAlign: "right" }]}>
            {strokes ? "NETTO" : "POÄNG"}
          </TGText>
        )}
      </View>
    </View>
  );
};
export default ScorecardHeaderRow;
