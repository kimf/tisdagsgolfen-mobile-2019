import React, { Component } from "react";
import { View } from "react-native";

import { colors, deviceHeight, deviceWidth } from "../../styles";
import { calculateExtraStrokes } from "../../utils";
import TouchableView from "../shared/TouchableView";
import HoleHeader from "./HoleHeader";
import ScorecardHeaderRow from "./ScorecardHeaderRow";
import ScoreInput from "./ScoreInput";
import ScoreRow from "./ScoreRow";
import UserColumn from "./UserColumn";

interface Props {
  hole: any;
  holesCount: number;
  playing: any[];
  scoringSession: any;
  scrollX: any;
}
interface State {
  scoringId: string | null;
}

class HoleView extends Component<Props, State> {

  public state = { scoringId: null };
  public toggleScoring = scoringId => {
    this.setState(state => {
      if (state.scoringId) {
        return { scoringId: null };
      }
      return { scoringId };
    });
  };

  public render() {
    const { hole, playing, holesCount, scoringSession, scrollX } = this.props;
    const { teamEvent, scoringType, liveScores } = scoringSession;
    const { scoringId } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: colors.blue }}>
        <HoleHeader {...hole} scrollX={scrollX} />
        <View
          style={{
            marginHorizontal: 10,
            height: deviceHeight - 170,
            width: deviceWidth - 20,
            backgroundColor: colors.white,
            borderRadius: 10,
            shadowColor: colors.darkGreen,
            shadowOffset: { width: 5, height: 5 },
            shadowRadius: 1,
            shadowOpacity: 0.5,
            elevation: 5,
          }}>
          <ScorecardHeaderRow
            teamEvent={teamEvent}
            scoringType={scoringType}
            scoring={scoringId !== null}
          />

          {playing.map((item, index) => {
            const userId = teamEvent ? index : item.users[0].id;

            const liveScore = liveScores.find(
              ls => ls.user.id === userId && ls.hole === hole.number,
            );
            const scoreItem = liveScore || {
              strokes: hole.par,
              putts: 2,
              points: 0,
              beers: 0,
              extraStrokes: calculateExtraStrokes(hole.index, item.extraStrokes, holesCount),
            };

            const isScoring = scoringId && scoringId === userId;
            return (
              <View
                key={`player_score_row_${userId}`}
                style={{
                  flexDirection: "row",
                  paddingRight: 10,
                  borderBottomWidth: index < playing.length - 1 ? 1 : 0,
                  borderBottomColor: colors.lightGray,
                  backgroundColor: isScoring ? colors.lightGray : colors.white,
                }}>
                {scoringId && scoringId !== userId ? null : (
                  <UserColumn item={item} scoreItem={scoreItem} />
                )}

                {scoringId ? null : (
                  <TouchableView
                    style={{ flexGrow: 2, padding: 20 }}
                    onPress={() => this.toggleScoring(userId)}>
                    <ScoreRow
                      scoringType={scoringType}
                      teamEvent={teamEvent}
                      scoreItem={scoreItem}
                    />
                  </TouchableView>
                )}

                {scoringId !== userId ? null : (
                  <View style={{ flex: 6 }}>
                    <ScoreInput
                      scoreItem={scoreItem}
                      playerId={userId}
                      holeNr={hole.number}
                      par={hole.par}
                      teamEvent={teamEvent}
                      onClose={this.toggleScoring}
                      scoringSessionId={scoringSession.id}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default HoleView;
