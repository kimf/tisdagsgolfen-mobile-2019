import React, { Component } from 'react'
import { Alert, View, Text, LayoutAnimation} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import NavigationBar from 'react-native-navbar';

import { getCache, removeCache } from './utils';
import styles from './styles';

import Login from './containers/Login';
import Home from './containers/Home';
import Loading from './components/Loading';
import SeasonPicker from './components/SeasonPicker';
import Profile from './components/Profile';

// Android-Support for LayoutAnimation ?
// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class TisdagsGolfen extends Component {
  state = {
    loggedIn: false,
    currentSeason: null,
    showSeasonPicker: false,
    showProfileModal: false
  }

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
    this.setState({ loggedIn: false, showProfileModal: false, showSeasonPicker: false })
  }

  _toggleSeasonpicker = () => {
    const config = animations.layout.easeInEaseOut
    LayoutAnimation.configureNext(config)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker });
  }

  _changeSeason = (currentSeason) => {
    this.setState({
      currentSeason,
      showSeasonPicker: false
    });
  }

  _toggleProfileModal = () => {
    const showProfileModal = !this.state.showProfileModal;
    this.setState({showProfileModal})
  }

  render () {
    const { data } = this.props;
    const { loggedIn, currentSeason, showSeasonPicker, showProfileModal } = this.state;

    if (data.loading)
      return <Loading />

    if (!data.user || !loggedIn)
      return <Login afterLogin={() => this._afterLogin() }/>

    const season = currentSeason
                   ? data.seasons.find(s => s.id === currentSeason.id)
                   : data.seasons[0];

    const titleConfig = { title: 'TISDAGSGOLFEN', tintColor: 'white' };
    const leftButtonConfig = {
      title: '🏌',
      handler: () => this._toggleProfileModal(),
      tintColor: '#cecece'
    };

    const caret = showSeasonPicker ? `↑` : `↓`;
    const rightButtonConfig = {
      title: `${season.name} ${caret}`,
      handler: () => this._toggleSeasonpicker(),
      tintColor: '#cecece'
    }

    const showLeaderboardTabs = parseInt(season.name, 10) > 2015;

    return (
      <View style={styles.container}>
        <Profile player={data.user} visible={showProfileModal} onClose={this._toggleProfileModal} onLogout={this._logout}/>
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

        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'stretch' }}>
          <Home user={data.user} showLeaderboardTabs={showLeaderboardTabs} currentSeasonId={season.id} logout={() => this._logout()} />
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
