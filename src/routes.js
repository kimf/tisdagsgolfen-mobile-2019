import { TabNavigator, TabView, StackNavigator } from 'react-navigation'

import Leaderboard from 'screens/Leaderboard'
import Events from 'screens/Events'
import Profile from 'screens/Profile'

import ScoreEventScreen from 'screens/EventScreens/ScoreEvent'
import NewEvent from 'screens/EventScreens/NewEvent'
import EventResult from 'screens/EventScreens/EventResult'
import SetupIndividualEvent from 'screens/EventScreens/SetupIndividualEvent'
import SetupTeamEvent from 'screens/EventScreens/SetupTeamEvent'
import LiveEvent from 'screens/EventScreens/LiveEvent'
import NewPlayer from 'screens/NewPlayer'

const eventRoutes = {
  Events: { screen: Events },
  NewEvent: { screen: NewEvent },
  EventResult: { screen: EventResult },
  SetupIndividualEvent: { screen: SetupIndividualEvent },
  SetupTeamEvent: { screen: SetupTeamEvent },
  LiveEvent: { screen: LiveEvent },
  NewPlayer: { screen: NewPlayer },
  ScoreEvent: { screen: ScoreEventScreen }
}

const EventStack = StackNavigator(eventRoutes, { headerMode: 'none', initialRouteName: 'Events' })
const routes = {
  Leaderboard: { screen: Leaderboard },
  Events: { screen: EventStack },
  Profile: { screen: Profile }
}

// eslint-disable-next-line import/prefer-default-export
export const TabStack = TabNavigator(routes, {
  tabBarComponent: TabView.TabBarBottom,
  tabBarPosition: 'bottom',
  initialRouteName: 'Leaderboard',
  animationEnabled: false,
  tabBarOptions: {
    inactiveTintColor: '#777',
    activeTintColor: '#2ECC71',
    showIcon: true,
    showLabel: false
  }
})
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
