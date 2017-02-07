import React, { Component } from 'react'
import { View, Text,   LayoutAnimation } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import NavigationBar from 'react-native-navbar';

import { getCache, removeCache } from './utils';
import styles from './styles';

import Login from './containers/Login';
import Home from './containers/Home';
import Loading from './components/Loading';
import SeasonPicker from './components/SeasonPicker';

const backgroundColor = '#fff'

class TisdagsGolfen extends Component {
  state = { loggedIn: false, currentSeason: null, showSeasonPicker: false }

  componentDidMount() {
    getCache('graphcoolToken').then(value => {
      this.setState({ loggedIn: value !== null });
    });
  }

  _afterLogin = () => {
    this.setState({ loggedIn: true })
  }

  _logout = () => {
    removeCache('graphcoolToken')
    this.setState({ loggedIn: false })
  }

  _toggleSeasonpicker = () => {
    const config = animations.layout.easeInEaseOut
    LayoutAnimation.configureNext(config)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker });
  }

  _changeSeason = (currentSeason) => {
    this.setState({currentSeason})
    this._toggleSeasonpicker(false);
  };

  render () {
    const { data } = this.props;
    const { loggedIn, currentSeason, showSeasonPicker } = this.state;

    if (data.loading)
      return <Loading />

    if (!data.user || !loggedIn)
      return <Login afterLogin={() => this._afterLogin() }/>

    const season = currentSeason
                   ? data.seasons.find(s => s.id === currentSeason.id)
                   : data.seasons[0];

    const titleConfig = { title: 'Tisdagsgolfen', tintColor: 'white' };
    const leftButtonConfig = {
      title: 'Logga ut',
      handler: () => this._logout(),
      tintColor: '#cecece'
    };

    const caret = showSeasonPicker ? `↑` : `↓`;
    const rightButtonConfig = {
      title: `${season ? `${season.name} ${caret}` : '...'}`,
      handler: () => this._toggleSeasonpicker(),
      tintColor: '#cecece'
    }

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
          ? <SeasonPicker seasons={data.seasons} currentSeason={season} onChangeSeason={(season) => this._changeSeason(season)} />
          : null
        }

        <View style={{ flex: 1, backgroundColor, alignItems: 'stretch' }}>
          <Home user={data.user} currentSeasonId={season.id} logout={() => this._logout()} />
        </View>
      </View>
    )
  }
}

const animations = {
  layout: {
    easeInEaseOut: {
      duration: 260,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 30,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
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
    }
  }
`

export default graphql(userQuery)(TisdagsGolfen)
