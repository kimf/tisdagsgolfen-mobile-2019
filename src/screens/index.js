import React from 'react'
import { Navigation } from 'react-native-navigation'
import { ApolloProvider } from 'react-apollo'

import Leaderboard from 'screens/Leaderboard'
import Events from 'screens/Events'
import Login from 'screens/Login'
import Profile from 'screens/Profile'

import NewEvent from 'screens/EventScreens/NewEvent'
import EventResult from 'screens/EventScreens/EventResult'
import SetupIndividualEvent from 'screens/EventScreens/SetupIndividualEvent'
import SetupTeamEvent from 'screens/EventScreens/SetupTeamEvent'
import LiveEvent from 'screens/EventScreens/LiveEvent'

import NewPlayer from 'screens/NewPlayer'

import ScoreEventScreen from 'screens/EventScreens/ScoreEvent'


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
  registerScreenWithApollo('tisdagsgolfen.Leaderboard', Leaderboard, store, client)

  // modals from main view
  registerScreenWithApollo('tisdagsgolfen.Events', Events, store, client)
  registerScreenWithApollo('tisdagsgolfen.Profile', Profile, store, client)

  // event sub-screens
  registerScreenWithApollo('tisdagsgolfen.NewEvent', NewEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.LiveEvent', LiveEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.EventResult', EventResult, store, client)

  // scoring event screens
  registerScreenWithApollo('tisdagsgolfen.SetupIndividualEvent', SetupIndividualEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.SetupTeamEvent', SetupTeamEvent, store, client)
  registerScreenWithApollo('tisdagsgolfen.ScoreEvent', ScoreEventScreen, store, client)

  // misc
  registerScreenWithApollo('tisdagsgolfen.NewPlayer', NewPlayer, store, client)
}

export default registerScreens
