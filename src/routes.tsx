import { createAppContainer, createStackNavigator } from "react-navigation";
import CoursePickerScreen from "./screens/EventScreens/CoursePickerScreen";
import LiveEventResult from "./screens/EventScreens/LiveEventResult";
import NewEventScoringItems from "./screens/EventScreens/NewEventScoringItems";
import NewEventSetup from "./screens/EventScreens/NewEventSetup";
import NewPlayer from "./screens/EventScreens/NewPlayer";
import ScoreEventScreen from "./screens/ScoreEvent";
import Season from "./screens/Season";

const RootStack = createStackNavigator(
  {
    Season: { screen: Season },
    ScoreEvent: { screen: ScoreEventScreen },
    CoursePickerScreen: { screen: CoursePickerScreen },
    NewEventSetup: { screen: NewEventSetup },
    NewEventScoringItems: { screen: NewEventScoringItems },
    NewPlayer: { screen: NewPlayer },
    LiveEventResult: { screen: LiveEventResult },
  },
  {
    initialRouteName: "Season",
    headerMode: "float",
  },
);

export default createAppContainer(RootStack);
