import React from 'react'
import { View } from 'react-native'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, action } from '@kadira/react-native-storybook'
import TGText from 'shared/TGText'

import { ScoreEvent } from 'screens/EventScreens/ScoreEvent'

import NavigationBar from './NavigationBar'
import CenterView from './CenterView'
import WithContext from '../WithContext'

const fakeNavigator = {
  setOnNavigatorEvent: () => { action('navigator.setOnNavigatorEvent') },
  dismissAllModals: () => { action('navigator.dismissAllModals') }
}

const reduxContext = {
  client: {},
  store: {}
}

storiesOf('ScoreEvent', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1 }}>
      <NavigationBar title="SCORING" />
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
