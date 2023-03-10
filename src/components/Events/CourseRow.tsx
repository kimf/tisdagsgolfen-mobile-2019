import React from "react";
import { View } from "react-native";
import styles, { colors } from "../../styles";
import { Course } from "../../types/userTypes";
import TGText from "../shared/TGText";
import TouchableView from "../shared/TouchableView";

interface CourseRowProps {
  course: Course;
  selectCourse: any;
}
const CourseRow: React.SFC<CourseRowProps> = ({ course, selectCourse }) => (
  <TouchableView
    key={`course_row_${course.id}`}
    style={styles.courserow}
    onPress={() => selectCourse(course)}>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TGText style={{ flex: 4, fontWeight: "bold" }}>{course.name}</TGText>
        <TGText style={{ flex: 1, fontSize: 14, color: colors.muted }}>PAR {course.par}</TGText>
        <TGText style={{ flex: 1, fontSize: 14, color: colors.muted }}>
          {course.holeCount} HÅL
        </TGText>
      </View>
      <View style={{ flex: 1 }}>
        <TGText style={{ color: colors.muted, marginTop: 10 }}>{course.club}</TGText>
      </View>
    </View>
  </TouchableView>
);
export default CourseRow;
