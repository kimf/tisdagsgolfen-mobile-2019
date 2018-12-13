import React, { Component } from "react";
import { Switch, View } from "react-native";
import SetupCourseRow from "../../components/Events/SetupCourseRow";
import TGText from "../../components/shared/TGText";
import BottomButton from "../../components/shared/BottomButton";
import styles, { colors } from "../../styles";
type NewEventSetupProps = {
  navigation: {
    state: {
      params?: {
        course: {
          id: any;
          club: any;
          name: any;
        };
      };
    };
    navigate: any;
  };
};
type NewEventSetupState = {
  isStrokes: boolean;
  teamEvent: boolean;
};
class NewEventSetup extends Component<NewEventSetupProps, NewEventSetupState> {
  static navigationOptions = {
    title: "Inställningar",
  };
  state = {
    isStrokes: false,
    teamEvent: false,
  };
  gotoScoringItems = () => {
    const { navigation } = this.props;
    const {
      state: { params },
    } = navigation;
    const { isStrokes, teamEvent } = this.state;
    navigation.navigate("NewEventScoringItems", {
      ...params,
      isStrokes,
      teamEvent,
    });
  };
  render() {
    const { navigation } = this.props;
    const {
      state: {
        params: { course },
      },
    } = navigation;
    const { teamEvent, isStrokes } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <SetupCourseRow course={course} />

          <View style={[styles.formRow, { flexDirection: "row", padding: 20 }]}>
            <TGText style={styles.label}>Lagtävling?</TGText>
            <Switch
              onValueChange={te => this.setState({ teamEvent: te })}
              style={styles.formColumnContent}
              value={teamEvent}
            />
          </View>
          <View style={[styles.formRow, { flexDirection: "row", padding: 20 }]}>
            <TGText style={styles.label}>Slaggolf?</TGText>
            <Switch
              onValueChange={isS => this.setState({ isStrokes: isS })}
              style={styles.formColumnContent}
              value={isStrokes}
            />
          </View>
        </View>
        <View style={{ padding: 10, backgroundColor: colors.lightGray }}>
          <BottomButton title="VÄLJ SPELARE" onPress={this.gotoScoringItems} />
        </View>
      </View>
    );
  }
}
export default NewEventSetup;
