import React, { Component } from "react";
import CoursePicker from "../../components/Events/CoursePicker";
import { Course } from "../../types/userTypes";

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
    const { navigation } = this.props;
    return (
      <CoursePicker
        selectCourse={(course: Course) => navigation.navigate("NewEventSetup", { course })}
      />
    );
  }
}
export default CoursePickerScreen;
