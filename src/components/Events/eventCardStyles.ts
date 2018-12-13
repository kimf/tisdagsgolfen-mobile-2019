import { StyleSheet } from 'react-native'
import { colors, deviceWidth } from '../../styles'
const styles = StyleSheet.create({
  /* EVENT CARDS */
  eventCard: {
    flexDirection: 'row',
    marginBottom: 10,
    minHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },
  dateBox: {
    width: 60,
    marginRight: 10
  },
  date: {
    color: colors.darkGreen,
    fontSize: 30,
    fontWeight: '900'
  },
  month: {
    color: colors.muted,
    fontSize: 14,
    paddingLeft: 4,
    fontWeight: '600'
  },
  course: {
    fontWeight: 'bold',
    marginTop: 2
  },
  gametype: {
    fontSize: 16,
    marginTop: 5,
    color: colors.muted
  },
  row: {
    width: deviceWidth - 120,
    flexDirection: 'column'
  },
  inlineButtonText: {
    fontSize: 14,
    color: colors.red,
    paddingLeft: 4,
    fontWeight: 'bold'
  }
})
export default styles
