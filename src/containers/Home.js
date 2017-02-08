import React, { Component } from 'react'
import { Alert, View, Text, Link, LayoutAnimation} from 'react-native'
import { Router, Redirect } from 'react-router-native'
import NavigationBar from 'react-native-navbar';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../styles';

import SeasonPicker from '../components/SeasonPicker';
import Season from '../components/Season';
// Android-Support for LayoutAnimation ?
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class Home extends Component {
  state = {
    currentSeasonId: null,
    showSeasonPicker: false
  }

  _changeSeason = (currentSeasonId) => {
    this.setState({
      currentSeasonId,
      showSeasonPicker: false
    });
  }

  _toggleSeasonpicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker });
  }

  render () {
    const { data, user, seasons } = this.props;
    const { currentSeasonId, showSeasonPicker } = this.state;

    const season = currentSeasonId
                   ? seasons.find(s => s.id === currentSeasonId)
                   : seasons[0];

    const titleConfig = { title: 'TISDAGSGOLFEN', tintColor: 'white' };

    const caret = showSeasonPicker ? `↑` : `↓`;
    const rightButtonConfig = {
      title: `${season.name} ${caret}`,
      handler: () => this._toggleSeasonpicker(),
      tintColor: '#cecece'
    }

    const leftButtonConfig = {
      title: ' 🏌 ',
      handler: () => this.props.push('/profile'),
      tintColor: '#fff'
    }

    console.log(this.props.location.pathname);

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.header}
          statusBar={{style: 'light-content', tintColor: '#0091e5'}}
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
        />

        { showSeasonPicker
          ? <SeasonPicker seasons={seasons} currentSeasonId={season.id} onChangeSeason={(season) => this._changeSeason(season)} />
          : null
        }

        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'stretch' }}>
          <Season
            season={season}
            user={user}
            currentPath={this.props.location.pathname}
            replaceRoute={this.props.replace}
          />
        </View>
      </View>
    )
  }
}

export default Home
