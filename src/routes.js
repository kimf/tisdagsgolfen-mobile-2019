import { StackNavigator } from 'react-navigation'

import Main from 'screens/Main'
import Events from 'screens/Events'
import Profile from 'screens/Profile'

/*
import NewEvent from 'screens/EventScreens/NewEvent'
import EventResult from 'screens/EventScreens/EventResult'
import SetupIndividualEvent from 'screens/EventScreens/SetupIndividualEvent'
import SetupTeamEvent from 'screens/EventScreens/SetupTeamEvent'
import LiveEvent from 'screens/EventScreens/LiveEvent'
import NewPlayer from 'screens/NewPlayer'
*/

import ScoreEventScreen from 'screens/EventScreens/ScoreEvent'

const routes = {
  Main: { screen: Main },
  Events: { screen: Events },
  Profile: { screen: Profile },
  ScoreEvent: { screen: ScoreEventScreen }
}

// eslint-disable-next-line import/prefer-default-export
export const MainStack = StackNavigator(routes, { headerMode: 'screen', mode: 'modal' })
/*
NewEvent: { screen: NewEvent },
EventResult: { screen: EventResult },
SetupIndividualEvent: { screen: SetupIndividualEvent },
SetupTeamEvent: { screen: SetupTeamEvent },
LiveEvent: { screen: LiveEvent },
NewPlayer: { screen: NewPlayer },
*/

/* path + getScreen
Profile: {
  path: 'profile/:name',
  getScreen: () => require('Profile').default,
}
*/
