import React from "react";
import { View } from "react-native";
import styles, { colors } from "../../styles";
import TGText from "../shared/TGText";
type SetupCourseRowProps = {
  course: {
    club: any;
    name: any;
  };
};
const SetupCourseRow: React.SFC<SetupCourseRowProps> = ({ course }) => (
  <View style={[styles.formRow, { backgroundColor: colors.lightGray, padding: 10 }]}>
    <TGText style={{ paddingLeft: 10, color: colors.semiDark, fontWeight: "bold" }}>
      {course.club}
    </TGText>
    <TGText
      style={{
        marginTop: 5,
        paddingLeft: 10,
        color: colors.semiDark,
        fontWeight: "bold",
      }}>
      {course.name}
    </TGText>
  </View>
);
export default SetupCourseRow;
