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

const ScoreStack = StackNavigator(
  {
    Leaderboard: { screen: Leaderboard },
    ScoreEvent: { screen: ScoreEventScreen }
  },
  { headerMode: 'screen', initialRouteName: 'Leaderboard', mode: 'modal' }
)

const EventStack = StackNavigator(
  {
    EventsIndex: { screen: EventsScreen },
    NewEvent: { screen: NewEvent },
    EventResult: { screen: EventResult },
    SetupIndividualEvent: { screen: SetupIndividualEvent },
    SetupTeamEvent: { screen: SetupTeamEvent },
    NewPlayer: { screen: NewPlayer },
    ScoreEvent: { screen: ScoreEventScreen }
  },
  {
    headerMode: 'screen',
    initialRouteName: 'EventsIndex'
  }
)

const TabStack = TabNavigator(
  {
    Leaderboard: { screen: ScoreStack },
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

const RootStack = StackNavigator(
  {
    Home: { screen: TabStack },
    Scoring: { screen: ScoreStack },
    Events: { screen: EventStack }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
)

export default RootStack
