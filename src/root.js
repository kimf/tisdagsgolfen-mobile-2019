import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { NativeRouter } from 'react-router-native'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import invariant from 'redux-immutable-state-invariant'

import client from './client'
import season from './reducers/season'
import event from './reducers/event'
import App from './App'


const configureStore = (onComplete) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = __DEV__ ? [invariant(), client.middleware()] : [client.middleware()] // thunk
  const reducers = combineReducers({
    season,
    event,
    apollo: client.reducer()
  })
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate()
    )
  )

  persistStore(store, { blacklist: ['apollo'], storage: AsyncStorage }, onComplete)
  return store
}


class Root extends Component {
  state = {
    isSetup: false,
    store: configureStore(() => this.setState({ isSetup: true }))
  }

  render() {
    if (!this.state.isSetup) { return null }
    return (
      <ApolloProvider store={this.state.store} client={client}>
        <NativeRouter initialEntries={['/']}>
          <App />
        </NativeRouter>
      </ApolloProvider>
    )
  }
}

export default Root
