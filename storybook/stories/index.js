import React from 'react'
import { View } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, action } from '@kadira/react-native-storybook'
import TGText from 'shared/TGText'

import HoleView from 'Scoring/HoleView'
import Login from 'screens/Login'
import { ScoreEvent } from 'screens/ScoringScreens/ScoreEvent'
import { Events } from 'screens/Events'

import CenterView from './CenterView'
import WithContext from '../WithContext'

const fakeNavigator = {
  setOnNavigatorEvent: () => { action('navigator.setOnNavigatorEvent') },
  dismissAllModals: () => { action('navigator.dismissAllModals') }
}

const currentUser = {
  id: 'userid',
  firstName: 'Kim',
  lastName: 'Fransman'
}

const currentSeason = {
  id: 'seasonid',
  name: '2017',
  closed: true
}

const reduxContext = {
  store: {
    getState: () => ({}),
    subscribe: () => { },
    dispatch: () => { }
  }
}

const navigation = {
  navigate: () => { }
}

const events = require('../eventsProps.json').data.events.reverse()

storiesOf('EventsScreen', module)
  .addDecorator(getStory => (
    <WithContext context={{ ...reduxContext }}>
      {getStory()}
    </WithContext>
  ))
  .add('Closed Season', () => (
    <Events
      seasonClosed
      currentSeason={currentSeason}
      currentUser={currentUser}
      navigation={navigation}
      data={{ loading: false, events }}
    />
  ))

  .add('Open Season', () => (
    <Events
      seasonClosed={false}
      currentSeason={currentSeason}
      currentUser={currentUser}
      navigation={navigation}
      data={{ loading: false, events }}
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
