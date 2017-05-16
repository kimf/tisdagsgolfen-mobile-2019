import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

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

const EventStack = StackNavigator(
  {
    EventsIndex: { screen: EventsScreen },
    NewEvent: { screen: NewEvent },
    EventResult: { screen: EventResult },
    SetupIndividualEvent: { screen: SetupIndividualEvent },
    SetupTeamEvent: { screen: SetupTeamEvent },
    NewPlayer: { screen: NewPlayer }
  },
  {
    headerMode: 'screen',
    initialRouteName: 'EventsIndex'
  }
)

const TabStack = TabNavigator(
  {
    Leaderboard: { screen: Leaderboard },
    Events: { screen: EventStack },
    Profile: { screen: Profile }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    initialRouteName: 'Leaderboard',
    animationEnabled: false,
    tabBarOptions: {
      inactiveTintColor: colors.muted,
      activeTintColor: colors.green,
      showIcon: true,
      showLabel: false
    }
  }
)

const MainStack = StackNavigator(
  {
    Main: { screen: TabStack },
    ScoreEvent: { screen: ScoreEventScreen }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Main'
  }

)

export default MainStack
