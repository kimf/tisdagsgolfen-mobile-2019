import React, { Component } from "react";
import { View } from "react-native";
import { withSigninUserMutation } from "../../graph/mutations/signinUserMutation";
import { colors } from "../../styles";
import TGText from "../shared/TGText";
import Form from "./LoginForm";
const icon = "☠️";
interface LoginProps {
  signinUser: any;
  onLogin: any;
  currentUser?: {
    email?: any;
  };
}
interface LoginState {
  email: any;
  password: string;
  loggingIn: boolean;
  error: null;
}
class Login extends Component<LoginProps, LoginState> {
  public static defaultProps = {
    currentUser: null,
  };
  constructor(props) {
    super(props);
    const { currentUser } = this.props;
    this.state = {
      email: (currentUser && currentUser.email) || "",
      password: "",
      loggingIn: false,
      error: null,
    };
  }
  public onSubmit = () => {
    this.setState({ loggingIn: true });
    const { email, password } = this.state;
    this.props
      .signinUser({ variables: { email, password } })
      .then(response => {
        this.props.onLogin(response.data.authenticateUser);
        this.setState({ loggingIn: false, error: false });
      })
      .catch(e => {
        // tslint:disable-next-line:no-console
        console.warn(e);
        this.setState({ error: true, loggingIn: false });
      });
  };
  public changeValue = valueObject => {
    this.setState(valueObject);
  };
  public render() {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "stretch",
          backgroundColor: colors.dark,
        }}>
        <TGText
          style={{
            padding: 20,
            fontSize: 60,
            color: colors.red,
            textAlign: "center",
          }}>
          {icon}
        </TGText>
        <Form {...this.state} changeValue={this.changeValue} onSubmit={this.onSubmit} />
      </View>
    );
  }
}
export default withSigninUserMutation(Login);
