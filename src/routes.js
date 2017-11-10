import { StackNavigator } from 'react-navigation'

// import Leaderboard from 'screens/Leaderboard'
// import EventsScreen from 'screens/Events'
// import Profile from 'screens/Profile'

// import NewEvent from 'screens/EventScreens/NewEvent'
// import EventResult from 'screens/EventScreens/EventResult'
// import LiveEventResult from 'screens/EventScreens/LiveEventResult' // TODO: Should this be a screen
// import NewPlayer from 'screens/NewPlayer'

import Season from 'screens/Season'

import ScoreEventScreen from 'screens/ScoringScreens/ScoreEvent'

// const EventStack = StackNavigator(
//   {
//     EventsIndex: { screen: EventsScreen },
//     NewEvent: { screen: NewEvent },
//     EventResult: { screen: EventResult },
//     LiveEventResult: { screen: LiveEventResult },
//     NewPlayer: { screen: NewPlayer }
//   },
//   {
//     initialRouteName: 'EventsIndex'
//   }
// )

const RootStack = StackNavigator(
  {
    Season: { screen: Season },
    ScoreEvent: { screen: ScoreEventScreen }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Season'
  }
)

export default RootStack
