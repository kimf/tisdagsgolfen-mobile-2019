import React, { Component } from "react";
import CoursePicker from "../../components/Events/CoursePicker";
import Login from "../../components/Login/Login";

interface CoursePickerScreenProps {
  screenProps: any;
  navigation: {
    goBack: any;
    navigate: any;
  };
}
class CoursePickerScreen extends Component<CoursePickerScreenProps, {}> {
  public static navigationOptions = {
    title: "Välj bana",
  };
  public render() {
    const {
      navigation,
      screenProps: { currentUser, isLoggedIn, onLogin },
    } = this.props;
    if (!isLoggedIn) {
      return <Login onLogin={onLogin} currentUser={currentUser} />;
    }
    return (
      <CoursePicker selectCourse={course => navigation.navigate("NewEventSetup", { course })} />
    );
  }
}
export default CoursePickerScreen;
