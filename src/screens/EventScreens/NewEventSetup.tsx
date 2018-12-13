import React, { Component } from "react";
import { Switch, View } from "react-native";
import { NavigationNavigateAction } from "react-navigation";

import SetupCourseRow from "../../components/Events/SetupCourseRow";
import BottomButton from "../../components/shared/BottomButton";
import TGText from "../../components/shared/TGText";
import styles, { colors } from "../../styles";
import { Course } from "../../types/userTypes";

interface NewEventSetupProps {
  navigation: {
    state: {
      params: {
        course: Course;
      };
    };
    navigate: any;
  };
}

interface NewEventSetupState {
  isStrokes: boolean;
  teamEvent: boolean;
}

class NewEventSetup extends Component<NewEventSetupProps, NewEventSetupState> {
  public static navigationOptions = {
    title: "Inställningar",
  };
  public state = {
    isStrokes: false,
    teamEvent: false,
  };
  public render() {
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

          <View style={[styles.listrow, { flexDirection: "row", padding: 20 }]}>
            <TGText style={styles.label}>Lagtävling?</TGText>
            <Switch
              onValueChange={te => this.setState({ teamEvent: te })}
              style={styles.formColumnContent}
              value={teamEvent}
            />
          </View>
          <View style={[styles.listrow, { flexDirection: "row", padding: 20 }]}>
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

  private gotoScoringItems = () => {
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
}
export default NewEventSetup;
