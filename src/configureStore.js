import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'

import event from 'reducers/event'
import app from 'reducers/app'

const configureStore = (client, onComplete) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = __DEV__
    ? [invariant(), thunk, client.middleware()]
    : [thunk, client.middleware()]

  const reducers = combineReducers({
    app,
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

  persistStore(store, { blacklist: ['apollo'], storage: AsyncStorage }, onComplete).purge()
  return store
}

export default configureStore
