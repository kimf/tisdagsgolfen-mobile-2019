import { StackNavigator } from 'react-navigation'

import Main from 'screens/Main'
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
  NewPlayer: { screen: NewPlayer }
}

const EventStack = StackNavigator(eventRoutes, { headerMode: 'none', initialRouteName: 'Events' })

const routes = {
  Main: { screen: Main },
  Events: { screen: EventStack },
  Profile: { screen: Profile },
  ScoreEvent: { screen: ScoreEventScreen }
}

// eslint-disable-next-line import/prefer-default-export
export const MainStack = StackNavigator(routes, { initialRouteName: 'Main', headerMode: 'screen', mode: 'modal' })

/* path + getScreen
Profile: {
  path: 'profile/:name',
  getScreen: () => require('Profile').default,
}
*/
