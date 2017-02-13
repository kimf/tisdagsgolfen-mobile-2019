import React, { Component } from 'react'
import { Alert, View, Text, Link, LayoutAnimation} from 'react-native'
import { Router, Redirect } from 'react-router-native'
import NavigationBar from 'react-native-navbar';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../styles';

import SeasonPicker from '../components/SeasonPicker';
import Season from '../components/Season';
import Loading from '../components/Loading';
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
    const { loading, user, seasons } = this.props.data;
    if(loading) {
      return <Loading text="Laddar data..." />
    }

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

    return (
      <View style={styles.container}>
        <NavigationBar
          style={styles.header}
          statusBar={{style: 'light-content', tintColor: '#000'}}
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


const userQuery = gql`
  query {
    user {
      id
      email
      firstName
      lastName
    }
    seasons: allSeasons(orderBy: name_DESC) {
      id
      name
      seasonLeaderboards(orderBy: position_ASC) {
        id
        averagePoints
        position
        previousPosition
        totalPoints
        top5Points
        eventCount
        totalKr
        totalBeers
        user {
          id
          firstName
          lastName
        }
      }
      events(orderBy: startsAt_DESC) {
        id
        status
        startsAt
        course
        scoringType
        teamEvent
        oldId
      }
    }
  }
`

export default graphql(userQuery)(Home)
