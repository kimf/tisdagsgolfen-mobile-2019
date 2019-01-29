import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor, persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import apolloLogger from "apollo-link-logger";
import { AsyncStorage } from "react-native";

import { CurrentUser } from "./types/userTypes";
import { getCache } from "./utils";

let token: string | null = null;

const withToken = setContext(() => {
  if (token) {
    return { headers: { authorization: token } };
  }

  return getCache("currentUser").then((currentUser?: CurrentUser) => {
    token = currentUser && currentUser.token ? `Token token=${currentUser.token}` : null;
    return { headers: { authorization: token } };
  });
});

const httpLink = createHttpLink({
  uri: "http://10.2.7.47:3001/api/graphql",
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

const cache = new InMemoryCache({
  dataIdFromObject,
  addTypename: true,
});

// const persistor = new CachePersistor({ cache, storage: AsyncStorage, key: "tg", debug: __DEV__ });
// persistor.purge();

export default new ApolloClient({
  cache,
  link: ApolloLink.from([withToken, apolloLogger, httpLink]),
});
