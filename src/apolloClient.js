import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { print } from 'graphql/language/printer'

import { getCache } from 'utils'

let token
const withToken = setContext((context) => {
  // if you have a cached value, return it immediately
  if (token) {
    return {
      ...context,
      headers: {
        ...context.headers,
        authorization: `Token token=${token}`
      }
    }
  }

  return getCache('currentUser').then(currentUser => ({
    ...context,
    headers: {
      ...context.headers,
      authorization: currentUser && currentUser.token ? `Token token=${currentUser.token}` : null
    }
  }))
})

const Logger = (operation, forward) => {
  const {
    operationName, query, variables, context
  } = operation

  // eslint-disable-next-line no-console
  // console.group(operationName)

  // eslint-disable-next-line no-console
  console.log({
    operationName,
    variables,
    context,
    query: print(query)
  })

  return forward(operation).map(({ data, errors }) => {
    // eslint-disable-next-line no-console
    console.log({ data, errors })
    // eslint-disable-next-line no-console
    // console.groupEnd()
    return { data, errors }
  })
}

const httpLink = createHttpLink({
  uri: 'https://www.tisdagsgolfen.se/api/graphql'
})

const link = ApolloLink.from([withToken, Logger, httpLink])

const dataIdFromObject = (result) => {
  // eslint-disable-next-line no-underscore-dangle
  if (result.id && result.__typename) {
    // eslint-disable-next-line no-underscore-dangle
    return result.__typename + result.id
  }
  // Make sure to return null if this object doesn't have an ID
  return null
}

const cache = new InMemoryCache({
  dataIdFromObject,
  addTypename: true
})

export default new ApolloClient({
  link,
  cache
})
