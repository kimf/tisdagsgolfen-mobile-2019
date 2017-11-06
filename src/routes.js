import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

import { colors } from 'styles'

import Leaderboard from 'screens/Leaderboard'
import EventsScreen from 'screens/Events'
import Profile from 'screens/Profile'

import NewEvent from 'screens/EventScreens/NewEvent'
import EventResult from 'screens/EventScreens/EventResult'
import LiveEventResult from 'screens/EventScreens/LiveEventResult' // TODO: Should this be a screen
import NewPlayer from 'screens/NewPlayer'

import ScoreEventScreen from 'screens/ScoringScreens/ScoreEvent'

const EventStack = StackNavigator(
  {
    EventsIndex: { screen: EventsScreen },
    NewEvent: { screen: NewEvent },
    EventResult: { screen: EventResult },
    LiveEventResult: { screen: LiveEventResult },
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
