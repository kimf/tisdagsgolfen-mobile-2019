import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import Config from 'react-native-config'
import { getCache } from 'utils'

const dataIdFromObject = result => result.id

const wsClient = new SubscriptionClient(Config.SUBSCRIPTION_URL, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  }
})

const networkInterface = createBatchingNetworkInterface({
  uri: Config.API_URL,
  batchInterval: 10,
  queryDeduplication: true
})

/* eslint-disable no-param-reassign */
networkInterface.use([{
  applyBatchMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    getCache('currentUser').then((currentUser) => {
      if (currentUser === null) {
        next()
      } else {
        req.options.headers.authorization = `Bearer ${currentUser.token}`
        next()
      }
    })
  }
}])
/* eslint-enable no-param-reassign */

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

export default new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject
})
