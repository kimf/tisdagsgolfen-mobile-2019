import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import apolloLogger from "apollo-link-logger";

import { CurrentUser } from "./types/userTypes";
import { getCache } from "./utils";

let token: string | null = null;

const withToken = setContext(() => {
  if (token) {
    return { token };
  }

  return getCache("currentUser").then((currentUser?: CurrentUser) => {
    token = currentUser && currentUser.token ? `Token token=${currentUser.token}` : null;
    return { authorization: token };
  });
});

const httpLink = createHttpLink({
  uri: "http://192.168.1.246:3000/api/graphql",
});
// __DEV__ ? 'https://www.tisdagsgolfen.se/api/graphql'

const dataIdFromObject = result => {
  // eslint-disable-next-line no-underscore-dangle
  if (result.id && result.__typename) {
    // eslint-disable-next-line no-underscore-dangle
    return result.__typename + result.id;
  }
  // Make sure to return null if this object doesn't have an ID
  return null;
};

export default new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject,
    addTypename: true,
  }),
  link: ApolloLink.from([apolloLogger, withToken, httpLink]),
});
