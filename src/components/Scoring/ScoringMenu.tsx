import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { colors } from "../../styles";
import RowButton from "../shared/RowButton";
import TGText from "../shared/TGText";
import TopButton from "../shared/TopButton";
const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingTop: 20
  },
  text: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 40
  },
  holeButton: {
    paddingVertical: 14,
    width: 40
  },
  holeButtonText: {
    textAlign: "center"
  }
});
const confirmCancel = cancelFunc => {
  Alert.alert(
    "Vill du verkligen avsluta rundan?",
    "Allt du matat in kommer raderas!",
    [
      { text: "Cancel", onPress: () => null, style: "cancel" },
      { text: "OK", onPress: () => cancelFunc() }
    ],
    { cancelable: false }
  );
};
interface ScoringMenuProps {
  onClose: any,
  onPreview: any,
  cancelRound: any,
  currentHole: any,
  holes: number[],
  changeHole: any
}
const ScoringMenu: React.SFC<ScoringMenuProps> = ({
  onClose,
  onPreview,
  cancelRound,
  currentHole,
  holes,
  changeHole
}) => (
  <View style={{ flex: 1 }}>
    <View style={styles.inner}>
      <TGText style={styles.text}>MENY</TGText>
      <View style={styles.buttonRow}>
        {holes.map(hole => (
          <TGText
            key={hole.number}
            style={[
              styles.holeButtonText,
              {
                color: currentHole === hole.number ? colors.white : colors.dark
              }
            ]}
            onPress={() => changeHole(hole.number)}
            viewStyle={[
              styles.holeButton,
              {
                backgroundColor:
                  currentHole === hole.number ? colors.green : colors.lightGray
              }
            ]}
          >
            {hole.number}
          </TGText>
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between"
        }}
      >
        <RowButton
          backgroundColor={colors.red}
          onPress={() => confirmCancel(cancelRound)}
          title="AVBRYT RUNDA"
        />
        <RowButton
          backgroundColor={colors.green}
          onPress={onPreview}
          title="SPARA RUNDA"
        />
      </View>
    </View>
    <TopButton
      backgroundColor={colors.blue}
      title="STÄNG"
      onPress={() => onClose()}
    />
  </View>
);
export default ScoringMenu;
