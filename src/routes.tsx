import { createAppContainer, createStackNavigator } from "react-navigation";
import CoursePickerScreen from "./screens/EventScreens/CoursePickerScreen";
import LiveEventResult from "./screens/EventScreens/LiveEventResult";
import NewEventScoringItems from "./screens/EventScreens/NewEventScoringItems";
import NewEventSetup from "./screens/EventScreens/NewEventSetup";
import NewPlayer from "./screens/EventScreens/NewPlayer";
import ScoreEventScreen from "./screens/ScoreEvent";
import Season from "./screens/Season";

const SeasonStack = createStackNavigator(
  {
    Season: { screen: Season },
  },
  {
    mode: "modal",
    headerMode: "none",
  },
);

const RootStack = createStackNavigator(
  {
    Season: { screen: SeasonStack },
    ScoreEvent: { screen: ScoreEventScreen },
    CoursePickerScreen: { screen: CoursePickerScreen },
    NewEventSetup: { screen: NewEventSetup },
    NewEventScoringItems: { screen: NewEventScoringItems },
    NewPlayer: { screen: NewPlayer, modal: true, mode: "modal" },
    LiveEventResult: { screen: LiveEventResult },
  },
  {
    initialRouteName: "Season",
    headerMode: "float",
  },
);

export default createAppContainer(RootStack);
