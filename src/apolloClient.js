import ApolloClient, { createNetworkInterface } from 'apollo-client'
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import Config from 'react-native-config'
import { getCache } from 'utils'

const dataIdFromObject = (result) => {
  // eslint-disable-next-line no-underscore-dangle
  if (result.id && result.__typename) {
    // eslint-disable-next-line no-underscore-dangle
    return result.__typename + result.id
  }
  // Make sure to return null if this object doesn't have an ID
  return null
}

// const wsClient = new SubscriptionClient(Config.SUBSCRIPTION_URL, {
//   reconnect: true,
//   connectionParams: {
//     // Pass any arguments you want for initialization
//   }
// })

const networkInterface = createNetworkInterface({
  uri: Config.API_URL,
  batchInterval: 10,
  queryDeduplication: true
})

/* eslint-disable no-param-reassign */
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      getCache('currentUser').then((currentUser) => {
        if (currentUser === null) {
          next()
        } else {
          req.options.headers.authorization = `Token token=${currentUser.token}`
          next()
        }
      })
    }
  }
])
/* eslint-enable no-param-reassign */

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// )

export default new ApolloClient({
  networkInterface,
  dataIdFromObject
})
