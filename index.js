import { AppRegistry, YellowBox } from "react-native";
import Instabug from "instabug-reactnative";

import App from "./src/App";
import { name as appName } from "./app.json";

Instabug.startWithToken("2610c5febca442457463f2b18fb57ce1", [Instabug.invocationEvent.shake]);

YellowBox.ignoreWarnings(['unknown call: "relay:check"']);

AppRegistry.registerComponent(appName, () => App);
