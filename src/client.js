import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { getCache } from './utils'

const networkInterface = createNetworkInterface(
  { uri: 'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e' }
)

networkInterface.use([ {
  applyMiddleware (req, next) {
    if (!req.options.headers)
      req.options.headers = {}

    getCache('graphcoolToken').then(graphcoolToken => {
      req.options.headers.authorization = `Bearer ${ graphcoolToken }`
      next()
    })
  },
} ])

export default new ApolloClient({ networkInterface })
