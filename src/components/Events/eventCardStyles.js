import { StyleSheet } from 'react-native'
import { deviceWidth } from 'styles'

const styles = StyleSheet.create({
  /* EVENT CARDS */
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    minHeight: 90,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#363',
    shadowOpacity: 0.2,
    shadowRadius: 10
  },

  dateBox: {
    width: 40,
    marginRight: 10,
    alignItems: 'center'
  },

  date: {
    color: '#000',
    fontSize: 24,
    fontWeight: '900'
  },

  month: {
    color: '#222',
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
    color: '#777'
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
    color: '#c00',
    textAlign: 'right',
    fontWeight: 'bold'
  },

  plannedEvent: {
    height: '90%',
    shadowRadius: 1,
    width: deviceWidth - 40,
    shadowColor: '#363',
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
