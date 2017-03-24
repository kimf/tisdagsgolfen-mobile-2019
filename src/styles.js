import { StyleSheet, Platform } from 'react-native'

export const colors = {
  cellBorder: '#CECECE',
  green: '#2ECC71',
  lightBlue: '#D9EEFF',
  dark: '#444444',
  semiDark: '#555',
  lightGray: '#EEEEEE'
}

export const NAVBAR_HEIGHT = 100
export const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 })

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
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'right',
    flex: 3
  },

  dimmerPoints: {
    color: colors.dark,
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    flex: 2,
    paddingTop: 5
  },

  position: {
    width: 20,
    marginRight: 5,
    flexDirection: 'column'
  },

  cardTitle: {
    minHeight: 40,
    flex: 6,
    flexDirection: 'column'
  },

  cardImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 8
  },

  meta: {
    fontFamily: 'System',
    color: colors.semiDark,
    flex: 1,
    fontSize: 12,
    marginTop: 3
  },

  metaLarger: {
    fontFamily: 'System',
    color: colors.semiDark,
    flex: 1,
    fontSize: 14,
    marginTop: 5
  },

  name: {
    color: 'black',
    fontFamily: 'System',
    fontWeight: '800',
    flex: 1,
    fontSize: 16
  },

  label: {
    fontFamily: 'System',
    marginTop: 10,
    marginLeft: 10,
    color: colors.dark,
    fontSize: 16
  },

  inputField: {
    fontFamily: 'System',
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
    fontFamily: 'System'
  },

  smallLabel: {
    fontSize: 10,
    fontFamily: 'System'
  },

  sectionHeader: {
    backgroundColor: colors.lightGray,
    padding: 10
  },

  sectionHeaderText: {
    color: colors.semiDark,
    fontSize: 12,
    fontFamily: 'System'
  },

  courserow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.cellBorder,
    flexDirection: 'row',
    padding: 20
  },

  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 10,
    height: NAVBAR_HEIGHT
  },

  navbarTitle: {
    color: '#000',
    fontWeight: '800',
    fontSize: 34,
    textAlign: 'left',
    justifyContent: 'flex-start'
  },

  navbarInner: {
    height: '100%',
    marginLeft: 15,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(142,142,147, 0.5)',
    borderBottomWidth: 1,
    paddingTop: STATUS_BAR_HEIGHT * 2,
    paddingRight: STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
