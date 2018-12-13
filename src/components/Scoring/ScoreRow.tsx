// TODO: Refactor and dry this up! (Maybe make a special TeamScoreRow to remove ifs)
import React from "react";
import { View } from "react-native";

import { colors } from "../../styles";
import TGText from "../shared/TGText";
import ScoreItemText from "./ScoreItemText";

const ScoreRow = ({ teamEvent, scoreItem, scoringType }) => {
  const strokes = scoringType === "strokes";
  return (
    <View style={{ flexDirection: "row" }}>
      {teamEvent || !scoreItem.id ? null : <ScoreItemText dimmed={true} title={scoreItem.beers} />}
      {scoreItem.id ? (
        <ScoreItemText title={strokes ? scoreItem.strokes : scoreItem.strokes} />
      ) : null}
      {teamEvent || !scoreItem.id ? null : <ScoreItemText title={scoreItem.putts} />}
      {scoreItem.id ? (
        <ScoreItemText
          fontWeight="bold"
          textAlign="right"
          title={strokes ? scoreItem.strokes - scoreItem.extraStrokes : scoreItem.points}
        />
      ) : (
        <TGText style={{ color: colors.red, paddingLeft: 80, paddingTop: 10 }}>TRYCK HÄR</TGText>
      )}
    </View>
  );
};

export default ScoreRow;
