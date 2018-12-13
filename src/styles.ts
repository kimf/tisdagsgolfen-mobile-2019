import { Dimensions, Platform, StyleSheet } from "react-native";

export const colors = {
  lightGray: "#ECEBEB",
  green: "#04B742",
  darkGreen: "rgba(6,83,60,1)",
  mutedGreen: "#D4F4E0",
  dark: "#000",
  semiDark: "rgb(94, 98, 105)",
  muted: "#7D8986",
  gray: "#A3A4A6",
  yellow: "#EDD21B",
  mutedYellow: "#F5E682",
  blue: "#3290FC",
  white: "#FFF",
  red: "#E30050",
};

export const NAVBAR_HEIGHT = 60;
export const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export default StyleSheet.create({
  /* MAIN LAYOUT PARTS */
  container: {
    backgroundColor: "white",
    alignItems: "stretch",
    flex: 1,
  },

  inlineHeader: {
    padding: 2,
    backgroundColor: colors.muted,
  },

  listrow: {
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: "row",
    padding: 8,
  },

  formColumn: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
  },

  formColumnContent: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 10,
  },

  points: {
    minHeight: 40,
    flexDirection: "column",
    flex: 3,
  },

  dimmerPoints: {
    color: colors.dark,
    fontFamily: "System",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    flex: 2,
    paddingTop: 5,
  },

  position: {
    minHeight: 40,
    width: 20,
    marginRight: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    minHeight: 40,
    flex: 5,
    flexDirection: "column",
  },

  cardImage: {
    height: 30,
    width: 30,
    borderRadius: 5,
    marginRight: 16,
    marginTop: 2,
  },

  smallCardImage: {
    height: 25,
    width: 25,
    borderRadius: 5,
    marginRight: -5,
  },

  meta: {
    fontFamily: "System",
    color: colors.semiDark,
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },

  metaLarger: {
    fontFamily: "System",
    color: colors.semiDark,
    flex: 1,
    fontSize: 14,
  },

  name: {
    color: "black",
    fontFamily: "System",
    fontWeight: "800",
    flex: 1,
    fontSize: 14,
    lineHeight: 16,
  },

  label: {
    fontFamily: "System",
    marginTop: 10,
    marginLeft: 10,
    color: colors.dark,
    fontSize: 16,
  },

  inputField: {
    fontFamily: "System",
    padding: 5,
    margin: 10,
    height: 40,
    backgroundColor: "white",
    fontSize: 16,
    paddingLeft: 10,
  },

  flexOne: {
    flex: 1,
  },

  strokeInfo: {
    flex: 1,
    textAlign: "right",
    fontFamily: "System",
  },

  smallLabel: {
    fontSize: 10,
    fontFamily: "System",
  },

  sectionHeader: {
    backgroundColor: colors.lightGray,
    padding: 10,
  },

  sectionHeaderText: {
    color: colors.semiDark,
    fontSize: 12,
    fontFamily: "System",
  },

  courserow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.lightGray,
    flexDirection: "row",
    padding: 20,
  },

  subHeader: {
    width: "100%",
    paddingLeft: 10,
  },

  subHeaderTitle: {
    color: colors.dark,
    fontWeight: "800",
    fontSize: 20,
    textAlign: "left",
    justifyContent: "flex-start",
  },

  topSection: {
    height: "50%",
    paddingVertical: 16,
  },

  bottomSection: {
    height: "50%",
    paddingVertical: 16,
    backgroundColor: colors.darkGreen,
    borderTopWidth: 1,
    borderTopColor: colors.blue,
  },

  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
});
