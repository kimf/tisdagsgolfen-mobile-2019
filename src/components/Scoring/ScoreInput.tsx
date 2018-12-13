import React, { Component } from "react";
import { compose } from "react-apollo";
import { Alert, Picker, View } from "react-native";
import { withCreateLiveScoreMutation } from "../../graph/mutations/createLiveScoreMutation";
import { withUpdateLiveScoreMutation } from "../../graph/mutations/updateLiveScoreMutation";
import { colors } from "../../styles";
import TopButton from "../shared/TopButton";
import {
  BEER_VALUES,
  pointsArray,
  PUTT_VALUES,
  STROKE_VALUES
} from "./constants";
interface ScoreInputProps {
  holeNr: any,
  playerId: any,
  scoringSessionId: any,
  par: any,
  teamEvent: any,
  scoreItem:
    | any
    | {
        beers: any,
        strokes: any,
        putts: any,
        extraStrokes: any
      },
  createLiveScore: any,
  updateLiveScore: any,
  onClose: any
}
interface ScoreInputState {
  beers: null,
  strokes: null,
  putts: null
}
class ScoreInput extends Component<ScoreInputProps, ScoreInputState> {
  public state = { beers: null, strokes: null, putts: null };
  constructor(props) {
    super(props);
    this.state = {
      beers: props.scoreItem.beers || 0,
      strokes: props.scoreItem.strokes || props.par,
      putts: props.scoreItem.putts || 2
    };
  }
  public onCloseScoreForm = () => {
    const {
      par,
      teamEvent,
      playerId,
      scoringSessionId,
      createLiveScore,
      updateLiveScore,
      holeNr,
      scoreItem
    } = this.props;
    const { extraStrokes } = scoreItem;
    const { beers, strokes, putts } = this.state;
    const newScoreItem = {
      points: scoreItem.points,
      extraStrokes,
      hole: holeNr,
      beers,
      strokes,
      putts,
      par
    };
    const ids = {
      scoringSessionId,
      userId: teamEvent ? null : playerId,
      teamIndex: teamEvent ? playerId : null
    };
    if (putts > strokes) {
      Alert.alert("Du verkar ha angett fler puttar än slag!");
    } else {
      const strokeSum = strokes - extraStrokes;
      const testSum = strokeSum - par;
      newScoreItem.points = parseInt(pointsArray[testSum], 10);
      const save = async () => {
        try {
          if (scoreItem.id) {
            await updateLiveScore(scoreItem.id, newScoreItem);
          } else {
            await createLiveScore(ids, newScoreItem);
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
        this.props.onClose();
      };
      save();
    }
  };
  public render() {
    const { teamEvent } = this.props;
    const putsPicker = teamEvent ? null : (
      <Picker
        style={{ flex: 1 }}
        selectedValue={this.state.putts}
        onValueChange={putts => this.setState({ putts })}
      >
        {PUTT_VALUES.map(val => (
          <Picker.Item key={val} value={val} label={`${val} puttar`} />
        ))}
      </Picker>
    );
    const beersPicker = teamEvent ? null : (
      <Picker
        style={{ flex: 1 }}
        selectedValue={this.state.beers}
        onValueChange={beers => this.setState({ beers })}
      >
        {BEER_VALUES.map(val => (
          <Picker.Item key={val} value={val} label={`${val} öl`} />
        ))}
      </Picker>
    );
    return (
      <View style={{ backgroundColor: colors.white }}>
        <View style={{ flexDirection: "row" }}>
          {beersPicker}
          <Picker
            style={{ flex: 1 }}
            selectedValue={this.state.strokes}
            onValueChange={strokes => this.setState({ strokes })}
          >
            {STROKE_VALUES.map(val => (
              <Picker.Item key={val} value={val} label={`${val} slag`} />
            ))}
          </Picker>
          {putsPicker}
        </View>
        <TopButton title="SPARA" onPress={this.onCloseScoreForm} />
      </View>
    );
  }
}
export default compose(
  withCreateLiveScoreMutation,
  withUpdateLiveScoreMutation
)(ScoreInput);
