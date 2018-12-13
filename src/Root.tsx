import React, { Component } from "react";
import { setCache } from "./utils";
import EmptyState from "./components/shared/EmptyState";
import RootStack from "./routes";
import {
  withInitialQuery,
  initialQueryShape
} from "./graph/queries/initialQuery";
type RootProps = {
  isLoggedIn: any,
  data?: any,
  currentUser?: {
    id?: any,
    email?: any
  }
};
type RootState = {
  currentUser: any,
  isLoggedIn: any
};
class Root extends Component<RootProps, RootState> {
  static defaultProps = {
    currentUser: null,
    data: {
      loading: true,
      activeScoringSession: null,
      seasons: []
    }
  };
  constructor(props) {
    super(props);
    const { currentUser, isLoggedIn } = props;
    this.state = { currentUser, isLoggedIn };
  }
  onLogin = response => {
    setCache("currentUser", {
      ...response.user,
      token: response.token
    }).then(() => {
      this.setState(state => ({
        ...state,
        isLoggedIn: true,
        currentUser: { ...response.user }
      }));
    });
  };
  onLogout = () => {
    const user = { email: this.state.currentUser.email };
    setCache("currentUser", {
      ...user,
      token: null
    }).then(() => {
      this.setState(state => ({
        ...state,
        isLoggedIn: false,
        currentUser: { ...user }
      }));
    });
  };
  render() {
    const {
      data: { activeScoringSession, seasons, loading }
    } = this.props;
    const { currentUser, isLoggedIn } = this.state;
    if (loading) return null;
    if (seasons.length === 0) return <EmptyState text="Inga säsonger..." />;
    return (
      <RootStack
        screenProps={{
          currentUser,
          isLoggedIn,
          activeScoringSession,
          seasons,
          onLogin: this.onLogin,
          onLogout: this.onLogout
        }}
      />
    );
  }
}
export default withInitialQuery(Root);
