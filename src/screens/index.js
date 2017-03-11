import React from 'react'
import { Navigation } from 'react-native-navigation'
import { ApolloProvider } from 'react-apollo'

import Leaderboard from './Leaderboard'
import Events from './Events'
import Login from './Login'

import NewEvent from './EventScreens/NewEvent'
import EventResult from './EventScreens/EventResult'
import ScoreEvent from './EventScreens/ScoreEvent'
import LiveEvent from './EventScreens/LiveEvent'

import NewPlayer from './NewPlayer'

import Profile from './Profile'

const withApollo = (WrappedComponent, store, client) => (
  // eslint-disable-next-line react/prefer-stateless-function
  class PP extends React.Component {
    static navigatorButtons = WrappedComponent.navigatorButtons
    static navigatorStyle = WrappedComponent.navigatorStyle

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
  // if not logged in, maybe only register this screen?
  registerScreenWithApollo('tisdagsgolfen.Login', Login, store, client)

  // main tabs
  registerScreenWithApollo('tisdagsgolfen.Leaderboard', Leaderboard, store, client)
  registerScreenWithApollo('tisdagsgolfen.Events', Events, store, client)

  registerScreenWithApollo('tisdagsgolfen.Profile', Profile, store, client)

  // event sub-screens
  registerScreenWithApollo('tisdagsgolfen.NewEvent', NewEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.ScoreEvent', ScoreEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.LiveEvent', LiveEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.EventResult', EventResult, store, client)

  // scoring event screens

  // misc
  registerScreenWithApollo('tisdagsgolfen.NewPlayer', NewPlayer, store, client)
}

export default registerScreens
