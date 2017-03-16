import { StyleSheet } from 'react-native'

export const colors = {
  cellBorder: '#CECECE',
  green: '#2ECC71',
  lightBlue: '#D9EEFF',
  dark: '#444444',
  semiDark: '#777777',
  lightGray: '#EEEEEE'
}

export const navigatorStyle = {
  navBarTranslucent: true,
  drawUnderNavBar: false,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  navBarSubtitleColor: 'white',
  statusBarTextColorScheme: 'light',
  navBarBackgroundColor: colors.green,
  fontFamily: 'Akrobat',
  navBarHideOnScroll: false
}

export default StyleSheet.create({
  /* MAIN LAYOUT PARTS */
  container: {
    backgroundColor: 'white',
    alignItems: 'stretch',
    flex: 1
  },

  inlineHeader: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: colors.lightBlue
  },

  listrow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.cellBorder,
    flexDirection: 'row',
    padding: 10
  },

  formColumn: {
    flex: 1,
    padding: 10
  },

  formColumnContent: {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 5,
    marginLeft: 10
  },

  points: {
    color: 'black',
    fontFamily: 'Akrobat',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'right',
    flex: 2
  },

  dimmerPoints: {
    color: colors.dark,
    fontFamily: 'Akrobat',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    flex: 2,
    paddingTop: 5
  },

  position: {
    marginRight: 5,
    width: 40,
    flexDirection: 'column'
  },

  cardTitle: {
    minHeight: 40,
    flex: 6,
    flexDirection: 'column'
  },

  meta: {
    fontFamily: 'Akrobat',
    color: colors.semiDark,
    flex: 1,
    fontSize: 12,
    marginTop: 3
  },

  metaLarger: {
    fontFamily: 'Akrobat',
    color: colors.semiDark,
    flex: 1,
    fontSize: 14,
    marginTop: 3
  },

  name: {
    color: 'black',
    fontFamily: 'Akrobat',
    fontWeight: '800',
    flex: 1,
    fontSize: 18
  },

  label: {
    fontFamily: 'Akrobat',
    marginTop: 10,
    marginLeft: 10,
    color: colors.dark,
    fontSize: 16
  },

  inputField: {
    fontFamily: 'Akrobat',
    padding: 5,
    margin: 10,
    height: 40,
    backgroundColor: 'white',
    fontSize: 16,
    paddingLeft: 10
  },

  flexOne: {
    flex: 1
  },

  strokeInfo: {
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Akrobat'
  },

  smallLabel: {
    fontSize: 10,
    fontFamily: 'Akrobat'
  },

  sectionHeader: {
    backgroundColor: colors.lightGray,
    padding: 10
  },

  sectionHeaderText: {
    color: colors.semiDark,
    fontSize: 12,
    fontFamily: 'Akrobat'
  },

  courserow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.cellBorder,
    flexDirection: 'row',
    padding: 20
  }
})
