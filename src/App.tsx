import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Platform, UIManager } from "react-native";
import client from "./apolloClient";
import Root from "./Root";
/* tslint:disable-next-line:no-commented-code */
// import withOneSignal from './withOneSignal'
// import deviceLog, { LogView } from 'react-native-device-log'
import { getCache } from "./utils";
interface AppState {
  checking: boolean;
  isLoggedIn: boolean;
  currentUser: null;
}
// deviceLog
//   .init(AsyncStorage, {
//     logToConsole: false,
//     logRNErrors: true,
//     maxNumberToRender: 0,
//     maxNumberToPersist: 100
//   })
//   .then(() => {
//     deviceLog.success('logger initialized')
//   })
// if (this.state.showLog) {
//   return (
//     <LogView style={{ flex: 1 }} inverted={false} timeStampFormat="HH:mm:ss" multiExpanded />
//   )
// }
class App extends Component<{}, AppState> {
  public state = {
    checking: true,
    isLoggedIn: false,
    currentUser: null,
  };
  constructor(props) {
    super(props);
    // TODO: This is the "withOneSignal" HoC
    if (Platform.OS === "android") {
      /* tslint:disable-next-line:no-unused-expression */
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  public componentWillMount = async () => {
    // await removeCache('currentUser')
    const currentUser = await getCache("currentUser");
    this.setState({
      currentUser,
      checking: false,
      isLoggedIn: !!(currentUser && currentUser.token),
    });
  };
  public render() {
    if (this.state.checking) {
      return null;
    }
    return (
      <ApolloProvider client={client}>
        <Root {...this.state} />
      </ApolloProvider>
    );
  }
}
export default App;
