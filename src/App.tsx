import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { Platform, UIManager } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useScreens } from "react-native-screens";

import client from "./apolloClient";
import Loading from "./components/shared/Loading";
import RootStack from "./routes";
import { colors } from "./styles";
import { CurrentUser } from "./types/userTypes";
import { getCache, setCache } from "./utils";
/* tslint:disable-next-line:no-commented-code */
// import withOneSignal from './withOneSignal'

useScreens();

interface AppState {
  checking: boolean;
  isLoggedIn: boolean;
  currentUser: CurrentUser | { email: string } | null;
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.blue,
  },
};

class App extends Component<{}, AppState> {
  public state = {
    checking: true,
    isLoggedIn: false,
    currentUser: null,
  } as AppState;

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

  public onLogin = response => {
    setCache("currentUser", {
      ...response.user,
      token: response.token,
    }).then(() => {
      this.setState(state => ({
        ...state,
        isLoggedIn: true,
        currentUser: { ...response.user },
      }));
    });
  };

  public onLogout = () => {
    const { currentUser } = this.state;
    const user = { email: currentUser ? currentUser.email : "" };
    setCache("currentUser", {
      ...user,
      token: null,
    }).then(() => {
      this.setState(state => ({
        ...state,
        isLoggedIn: false,
        currentUser: { ...user },
      }));
    });
  };

  public render() {
    const { checking, currentUser, isLoggedIn } = this.state;
    if (checking) {
      return <Loading />;
    }
    return (
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <RootStack
            screenProps={{
              currentUser,
              isLoggedIn,
              onLogin: this.onLogin,
              onLogout: this.onLogout,
            }}
          />
        </PaperProvider>
      </ApolloProvider>
    );
  }
}
export default App;
