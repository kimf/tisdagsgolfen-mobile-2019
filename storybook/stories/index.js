import React from 'react'
import { View } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, action } from '@kadira/react-native-storybook'
import TGText from 'shared/TGText'

import { ScoreEvent } from 'screens/EventScreens/ScoreEvent'
import HoleView from 'Scoring/HoleView'

import NewLeaderBoard from 'screens/NewLeaderboard'
import Login from 'screens/Login'

// import NavigationBar from './NavigationBar'
import CenterView from './CenterView'
import WithContext from '../WithContext'

const fakeNavigator = {
  setOnNavigatorEvent: () => { action('navigator.setOnNavigatorEvent') },
  dismissAllModals: () => { action('navigator.dismissAllModals') }
}

const reduxContext = {
  client: {},
  store: {
    getState: () => ({ app: {} }),
    subscribe: () => { }
  }
}

storiesOf('NewLeaderboard', module)
  .add('Default', () => (
    <NewLeaderBoard
      data={{ loading: false, scoringSession: require('../leaderboardProps.json').data }}
    />
  ))

storiesOf('HoleView', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1 }}>
      <WithContext context={{ ...reduxContext }}>
        {getStory()}
      </WithContext>
    </View>
  ))
  .add('Default', () => (
    <HoleView
      key={'hole_view_stringid'}
      {...require('../holeViewProps.json')}
      toggleScroll={action('call on prop toggleScroll')}
      onChangeHole={action('changeHole')}
    />
  ))

storiesOf('ScoreEvent', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1 }}>
      <WithContext context={{ ...reduxContext }}>
        {getStory()}
      </WithContext>
    </View>
  ))
  .add('Individual Event...', () => (
    <ScoreEvent
      data={{ loading: false, scoringSession: require('../scoringSession.json').data.scoringSession }}
      navigator={fakeNavigator}
    />
  ))
  .add('Loading...', () => (
    <ScoreEvent navigator={fakeNavigator} />
  ))

storiesOf('TGText', module)
  .addDecorator(getStory => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('with text', () => (
    <TGText>Hello TGText</TGText>
  ))
  .add('with onPress', () => (
    <TGText onPress={action('clicked-TGText')}>
      😀 Hello button
    </TGText>
  ))
  .add('with onPress + viewStyle + style', () => (
    <TGText
      onPress={action('clicked-TGText')}
      viewStyle={{ backgroundColor: 'black', padding: 20 }}
      style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}
    >
      HELLO BLACK BUTTON
    </TGText>
  ))

storiesOf('Login', module)
  .add('Default', () => (
    <WithContext context={{ ...reduxContext }}>
      <Login />
    </WithContext>
  ))
