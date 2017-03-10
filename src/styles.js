import { StyleSheet } from 'react-native'

import colors from 'colors'

export const navigatorStyle = {
  navBarTranslucent: true,
  drawUnderNavBar: false,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  navBarSubtitleColor: 'white',
  statusBarTextColorScheme: 'light',
  navBarBackgroundColor: '#2ecc71',
  navBarHideOnScroll: false
}

export default StyleSheet.create({
  /* MAIN LAYOUT PARTS */
  container: {
    backgroundColor: '#fff',
    alignItems: 'stretch',
    flex: 1
  },

  inlineHeader: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#D9EEFF'
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
    color: '#000',
    fontFamily: 'Avenir',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'right',
    flex: 2
  },

  dimmerPoints: {
    color: '#444',
    fontFamily: 'Avenir',
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
    flex: 6,
    flexDirection: 'column'
  },

  meta: {
    fontFamily: 'Avenir',
    color: '#777',
    flex: 1,
    fontSize: 12,
    marginTop: 3
  },

  metaLarger: {
    fontFamily: 'Avenir',
    color: '#777',
    flex: 1,
    fontSize: 14,
    marginTop: 3
  },

  name: {
    color: '#000',
    fontFamily: 'Avenir',
    fontWeight: '800',
    flex: 1,
    fontSize: 18
  },

  label: {
    fontFamily: 'Avenir',
    marginTop: 10,
    marginLeft: 10,
    color: '#444',
    fontSize: 16
  },

  inputField: {
    fontFamily: 'Avenir',
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
    fontFamily: 'Avenir'
  },

  smallLabel: {
    fontSize: 10,
    fontFamily: 'Avenir'
  },

  sectionHeader: {
    backgroundColor: '#eee',
    padding: 10
  },

  sectionHeaderText: {
    color: '#777',
    fontSize: 12,
    fontFamily: 'Avenir'
  },

  courserow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.cellBorder,
    flexDirection: 'row',
    padding: 20
  }
})
