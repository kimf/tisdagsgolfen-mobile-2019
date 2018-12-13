import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../styles";
import TGText from "../shared/TGText";
const styles = StyleSheet.create({
  view: {
    height: 44,
    backgroundColor: colors.blue,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  button: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: colors.lightGray,
    fontWeight: "bold",
  },
  menu: {
    textAlign: "left",
  },
  leaderboard: {
    textAlign: "right",
  },
});
interface ScoringFooterProps {
  showMenu: any;
  showLeaderboard: any;
}
const ScoringFooter: React.SFC<ScoringFooterProps> = ({ showMenu, showLeaderboard }) => (
  <View style={styles.view}>
    <TGText onPress={showMenu} viewStyle={styles.button} style={[styles.text, styles.menu]}>
      MENY
    </TGText>
    <TGText
      onPress={showLeaderboard}
      viewStyle={styles.button}
      style={[styles.text, styles.leaderboard]}>
      LEDARTAVLA
    </TGText>
  </View>
);
export default ScoringFooter;
