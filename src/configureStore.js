import { AsyncStorage } from 'react-native'
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

import app from 'reducers/app'

const configureStore = (client, onComplete) => {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const middleware = [thunk, client.middleware()]
  /*  if (__DEV__) {
    middleware.push(freeze)
  } */

  const reducers = combineReducers({ app, apollo: client.reducer() })
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(...middleware),
      autoRehydrate()
    )
  )

  persistStore(store, { blacklist: ['apollo'], storage: AsyncStorage }, onComplete) // .purge()
  return store
}

export default configureStore
