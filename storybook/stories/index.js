/* eslint-disable jsx-a11y */
import React from 'react'
import { View } from 'react-native'

/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
/* eslint-enable import/no-extraneous-dependencies */

import TGText from 'shared/TGText'

import HoleView from 'Scoring/HoleView'
import Login from 'screens/Login'
import { ScoreEvent } from 'screens/ScoringScreens/ScoreEvent'
import { Events } from 'screens/Events'

import CenterView from './CenterView'
// import WithContext from '../WithContext'

const fakeNavigator = {
  setOnNavigatorEvent: () => {
    action('navigator.setOnNavigatorEvent')
  },
  dismissAllModals: () => {
    action('navigator.dismissAllModals')
  }
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

const navigation = {
  navigate: () => {}
}

const events = require('../eventsProps.json').data.events.reverse()

storiesOf('EventsScreen', module)
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
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('Default', () => (
    <HoleView
      key="hole_view_stringid"
      {...require('../holeViewProps.json')}
      toggleScroll={action('call on prop toggleScroll')}
      onChangeHole={action('changeHole')}
    />
  ))

storiesOf('ScoreEvent', module)
  .addDecorator(getStory => <View style={{ flex: 1 }}>{getStory()}</View>)
  .add('Individual Event...', () => (
    <ScoreEvent
      data={{
        loading: false,
        scoringSession: require('../scoringSession.json').data.scoringSession
      }}
      navigation={fakeNavigator}
    />
  ))
  .add('Loading...', () => <ScoreEvent navigator={fakeNavigator} />)

storiesOf('TGText', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => <TGText>Hello TGText</TGText>)
  .add('with onPress', () => <TGText onPress={action('clicked-TGText')}>😀 Hello button</TGText>)
  .add('with onPress + viewStyle + style', () => (
    <TGText
      onPress={action('clicked-TGText')}
      viewStyle={{ backgroundColor: 'black', padding: 20 }}
      style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}
    >
      HELLO BLACK BUTTON
    </TGText>
  ))

storiesOf('Login', module).add('Default', () => <Login />)
