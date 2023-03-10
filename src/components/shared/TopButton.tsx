import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../styles";
import TGText from "./TGText";
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yellow,
    padding: 16,
    width: "100%",
    alignSelf: "flex-end",
  },
  text: {
    color: colors.dark,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
});
interface TopButtonProps {
  title: any;
  onPress: any;
}
const TopButton: React.SFC<TopButtonProps> = ({ title, onPress }) => (
  <TGText viewStyle={styles.button} style={styles.text} onPress={onPress}>
    {title}
  </TGText>
);
export default TopButton;
