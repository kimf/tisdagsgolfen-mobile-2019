import { StyleSheet } from 'react-native'
import { deviceWidth, colors } from 'styles'

const styles = StyleSheet.create({
  /* EVENT CARDS */
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    minHeight: 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: colors.muted,
    shadowOffset: { height: 10, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10
  },

  dateBox: {
    width: 40,
    marginRight: 10,
    alignItems: 'center'
  },

  date: {
    color: colors.darkGreen,
    fontSize: 24,
    fontWeight: '900'
  },

  month: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600'
  },

  course: {
    fontWeight: 'bold',
    marginTop: 2
  },

  gametype: {
    fontSize: 14,
    marginTop: 5,
    color: colors.muted
  },

  row: {
    width: deviceWidth - 180,
    flexDirection: 'column'
  },

  inlineButton: {
    width: 80,
    borderRadius: 5,
    paddingHorizontal: 16
  },

  inlineButtonText: {
    fontSize: 18,
    color: colors.red,
    textAlign: 'right',
    fontWeight: 'bold'
  },

  plannedEvent: {
    height: '90%',
    shadowRadius: 1,
    width: deviceWidth - 40,
    shadowColor: colors.darkGreen,
    shadowOpacity: 0.2
  },

  playedEvent: {
    height: '90%',
    shadowRadius: 1,
    width: deviceWidth / 2.5,
    marginHorizontal: 5
  }
})

export default styles
