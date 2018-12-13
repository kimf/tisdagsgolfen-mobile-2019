import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../styles";
import TGText from "../shared/TGText";
import LoginError from "./LoginError";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  label: {
    color: colors.yellow,
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.lightGray,
    borderColor: colors.semiDark,
    borderWidth: 1,
    width: "90%",
    height: 40,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    color: colors.dark,
    fontFamily: "System",
  },
  inputWrapper: {
    marginBottom: 5,
  },
  loginButton: {
    paddingVertical: 16,
    backgroundColor: colors.blue,
    width: "90%",
    margin: 20,
  },
  loginButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    color: colors.white,
  },
});
interface LoginFormProps {
  email?: any;
  password?: any;
  changeValue: any;
  onSubmit: any;
  loggingIn: any;
  error?: any;
}
const LoginForm: React.SFC<LoginFormProps> = ({
  email,
  password,
  changeValue,
  onSubmit,
  loggingIn,
  error,
}) => (
  <View behavior="position" style={styles.container}>
    {error && <LoginError />}

    <TGText style={styles.label}>E-post</TGText>
    <TextInput
      autoFocus={true}
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
      keyboardType="email-address"
      returnKeyType="next"
      onChangeText={emailValue => changeValue({ email: emailValue })}
      onSubmitEditing={() => this.password.focus()}
      blurOnSubmit={false}
      value={email}
    />

    <TGText style={styles.label}>Lösenord</TGText>
    <TextInput
      style={styles.input}
      autoCapitalize="none"
      returnKeyType="go"
      autoCorrect={false}
      ref={c => {
        this.password = c;
      }}
      onChangeText={passwordValue => changeValue({ password: passwordValue })}
      onSubmitEditing={onSubmit}
      blurOnSubmit={false}
      value={password}
      secureTextEntry={true}
    />

    <TGText
      viewStyle={styles.loginButton}
      style={styles.loginButtonText}
      onPress={() => !loggingIn && onSubmit()}>
      {loggingIn ? "...LOGGAR IN..." : "LOGGA IN"}
    </TGText>
  </View>
);

export default LoginForm;
