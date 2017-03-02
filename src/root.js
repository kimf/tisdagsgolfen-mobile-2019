import React from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'

import client from './client'
import history from './reducers/history'
import season from './reducers/season'
import Router from './Router'
import App from './App'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const reducer = combineReducers({ history, season, apollo: client.reducer() })
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(client.middleware()),
    autoRehydrate()
  )
)

persistStore(store, { blacklist: ['apollo'], storage: AsyncStorage })

export default (
  <ApolloProvider store={store} client={client}>
    <Router initialEntries={['/']}>
      <App />
    </Router>
  </ApolloProvider>
)
