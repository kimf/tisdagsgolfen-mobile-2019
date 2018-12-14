import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Platform, UIManager } from "react-native";

import client from "./apolloClient";
import Root from "./Root";
import { getCache } from "./utils";
/* tslint:disable-next-line:no-commented-code */
// import withOneSignal from './withOneSignal'

interface AppState {
  checking: boolean;
  isLoggedIn: boolean;
  currentUser: null;
}

class App extends Component<{}, AppState> {
  public state = {
    checking: true,
    isLoggedIn: false,
    currentUser: null,
  };
  constructor(props) {
    super(props);
    // TODO: This is also in the "withOneSignal" HoC
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
