import React from 'react'
import { Navigation } from 'react-native-navigation'
import { ApolloProvider } from 'react-apollo'

import Leaderboard from './Leaderboard'
import EventList from './EventList'
import Profile from './Profile'
import Login from './Login'

import EventResult from './EventResult'

const withApollo = (WrappedComponent, store, client) => (
  // eslint-disable-next-line react/prefer-stateless-function
  class PP extends React.Component {
    static navigatorButtons = WrappedComponent.navigatorButtons
    render() {
      return (
        <ApolloProvider client={client} store={store}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
)

const registerScreenWithApollo = (name, Component, store, client) => {
  Navigation.registerComponent(name, () => withApollo(Component, store, client))
}

// register all screens of the app (including internal ones)
const registerScreens = (store, client) => {
  registerScreenWithApollo('tisdagsgolfen.Leaderboard', Leaderboard, store, client)
  registerScreenWithApollo('tisdagsgolfen.EventList', EventList, store, client)
  registerScreenWithApollo('tisdagsgolfen.Profile', Profile, store, client)
  registerScreenWithApollo('tisdagsgolfen.Login', Login, store, client)
  registerScreenWithApollo('tisdagsgolfen.EventResult', EventResult, store, client)
}

export default registerScreens
