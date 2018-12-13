import React, { Component } from "react";
import Login from "../../components/Login/Login";
import CoursePicker from "../../components/Events/CoursePicker";
import { screenPropsShape } from "../../_propTypes";
type CoursePickerScreenProps = {
  screenProps: any,
  navigation: {
    goBack: any,
    navigate: any
  }
};
class CoursePickerScreen extends Component<CoursePickerScreenProps, {}> {
  static navigationOptions = {
    title: "Välj bana"
  };
  render() {
    const {
      navigation,
      screenProps: { currentUser, isLoggedIn, onLogin }
    } = this.props;
    if (!isLoggedIn) {
      return <Login onLogin={onLogin} currentUser={currentUser} />;
    }
    return (
      <CoursePicker
        selectCourse={course =>
          navigation.navigate("NewEventSetup", { course })
        }
      />
    );
  }
}
export default CoursePickerScreen;
