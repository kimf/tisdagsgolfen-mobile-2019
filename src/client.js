import ApolloClient, { createNetworkInterface, createBatchingNetworkInterface } from 'apollo-client'
import { getCache } from './utils'

// const networkInterface = createBatchingNetworkInterface({
//   uri: 'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e',
//   batchInterval: 10,
//   queryDeduplication: true
// })

const networkInterface = createNetworkInterface(
  { uri: 'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e' }
)

networkInterface.use([ {
  applyMiddleware (req, next) {
    if (!req.options.headers)
      req.options.headers = {}

    getCache('currentUser').then(currentUser => {
      if(currentUser === null) {
        next()
      } else {
        req.options.headers.authorization = `Bearer ${ currentUser.token }`
        next()
      }
    })
  },
} ])

export default new ApolloClient({ networkInterface })
