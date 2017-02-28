import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'

import client from './client'
import history from './history'
import Router from './Router'
import App from './App'

const reducer = combineReducers({ history, apollo: client.reducer() })
const store = createStore(
  reducer,
  {}, // initial state
  compose(
    applyMiddleware(client.middleware()),
    // If you are using the devToolsExtension, you can add it here also
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)

// Logger
store.subscribe(() => {
  const { history: { index, entries } } = store.getState()
  const pathnames = entries.slice(0, index + 1).map(({ pathname }) => pathname)
  // eslint-disable-next-line no-console
  console.log(pathnames)
})


export default (
  <ApolloProvider store={store} client={client}>
    <Router initialEntries={['/']}>
      <App />
    </Router>
  </ApolloProvider>
)
