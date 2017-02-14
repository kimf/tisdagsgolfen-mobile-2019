import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client'
import { getCache } from './utils'

const dataIdFromObject = (result) => {
  // eslint-disable-next-line no-underscore-dangle
  if (result.id && result.__typename) {
    // eslint-disable-next-line no-underscore-dangle
    return result.__typename + result.id
  } else if (result.id) {
    return result.id
  }
  return null
}

const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e',
  batchInterval: 10,
  queryDeduplication: true
})

// const networkInterface = createNetworkInterface(
//   { uri: 'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e' }
// )

/* eslint-disable no-param-reassign */
networkInterface.use([{
  applyMiddleware(req, next) {
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

export default new ApolloClient({ networkInterface, dataIdFromObject })
