import { AppRegistry, YellowBox } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";

YellowBox.ignoreWarnings(['unknown call: "relay:check"']);

AppRegistry.registerComponent(appName, () => App);
