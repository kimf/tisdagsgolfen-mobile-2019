import { StackNavigator } from 'react-navigation'

import Season from 'screens/Season'
import ScoreEventScreen from 'screens/ScoreEvent'

import CoursePickerScreen from 'screens/EventScreens/CoursePickerScreen'
import NewEventSetup from 'screens/EventScreens/NewEventSetup'
import NewEventScoringItems from 'screens/EventScreens/NewEventScoringItems'
import LiveEventResult from 'screens/EventScreens/LiveEventResult'
import NewPlayer from 'screens/EventScreens/NewPlayer'

const SeasonStack = StackNavigator(
  {
    Season: { screen: Season }
  },
  {
    mode: 'modal',
    headerMode: 'float'
  }
)

const RootStack = StackNavigator(
  {
    Season: { screen: SeasonStack },
    ScoreEvent: { screen: ScoreEventScreen },
    CoursePickerScreen: { screen: CoursePickerScreen },
    NewEventSetup: { screen: NewEventSetup },
    NewEventScoringItems: { screen: NewEventScoringItems },
    NewPlayer: { screen: NewPlayer, modal: true, mode: 'modal' },
    LiveEventResult: { screen: LiveEventResult }
  },
  {
    initialRouteName: 'Season',
    headerMode: 'float'
  }
)

export default RootStack
