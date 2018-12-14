import React, { Component } from "react";

import EmptyState from "./components/shared/EmptyState";
import { withInitialQuery } from "./graph/queries/initialQuery";
import RootStack from "./routes";
import { setCache } from "./utils";

interface RootProps {
  isLoggedIn: any;
  data?: any;
  currentUser?: {
    id?: any;
    email?: any;
  };
}
interface RootState {
  currentUser: any;
  isLoggedIn: any;
}
class Root extends Component<RootProps, RootState> {
  constructor(props) {
    super(props);
    const { currentUser, isLoggedIn } = props;
    this.state = { currentUser, isLoggedIn };
  }

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
    const user = { email: this.state.currentUser.email };
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
    const {
      data: { activeScoringSession, seasons, loading, error },
    } = this.props;
    const { currentUser, isLoggedIn } = this.state;
    if (loading) {
      return null;
    }
    if (error) {
      return <EmptyState text="Nätverks ERROR..." />;
    }
    if (seasons.length === 0) {
      return <EmptyState text="Inga säsonger..." />;
    }
    return (
      <RootStack
        screenProps={{
          currentUser,
          isLoggedIn,
          activeScoringSession,
          seasons,
          onLogin: this.onLogin,
          onLogout: this.onLogout,
        }}
      />
    );
  }
}

export default withInitialQuery(Root);
