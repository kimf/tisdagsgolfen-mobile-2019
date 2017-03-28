import { TabNavigator, TabView, StackNavigator } from 'react-navigation'

import { colors } from 'styles'

import Leaderboard from 'screens/Leaderboard'
import EventsScreen from 'screens/Events'
import Profile from 'screens/Profile'

import NewEvent from 'screens/EventScreens/NewEvent'
import EventResult from 'screens/EventScreens/EventResult'
import SetupIndividualEvent from 'screens/EventScreens/SetupIndividualEvent'
import SetupTeamEvent from 'screens/EventScreens/SetupTeamEvent'
import NewPlayer from 'screens/NewPlayer'

import ScoreEventScreen from 'screens/ScoringScreens/ScoreEvent'

const scoringRoutes = {
  Leaderboard: { screen: Leaderboard },
  ScoreEvent: { screen: ScoreEventScreen }
}
const ScoreStack = StackNavigator(scoringRoutes, { headerMode: 'screen', initialRouteName: 'Leaderboard', mode: 'modal' })

const eventRoutes = {
  EventsIndex: { screen: EventsScreen },
  NewEvent: { screen: NewEvent },
  EventResult: { screen: EventResult },
  SetupIndividualEvent: { screen: SetupIndividualEvent },
  SetupTeamEvent: { screen: SetupTeamEvent },
  NewPlayer: { screen: NewPlayer }
}
const EventStack = StackNavigator(eventRoutes, { headerMode: 'screen', initialRouteName: 'EventsIndex' })

const tabRoutes = {
  Leaderboard: { screen: ScoreStack },
  Events: { screen: EventStack },
  Profile: { screen: Profile }
}

const TabStack = TabNavigator(tabRoutes, {
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom',
  initialRouteName: 'Leaderboard',
  animationEnabled: false,
  tabBarOptions: {
    inactiveTintColor: colors.muted,
    activeTintColor: colors.green,
    showIcon: true,
    showLabel: false
  }
})

const mainRoutes = {
  Home: { screen: TabStack },
  Scoring: { screen: ScoreStack },
  Events: { screen: EventStack }
}

const RootStack = StackNavigator(mainRoutes, {
  headerMode: 'none',
  initialRouteName: 'Home'
})

export default RootStack

// export const MainStack = StackNavigator(
//   routes,
//   { initialRouteName: 'Main', headerMode: 'screen' }
// )

/* path + getScreen
Profile: {
  path: 'profile/:name',
  getScreen: () => require('Profile').default,
}
*/
