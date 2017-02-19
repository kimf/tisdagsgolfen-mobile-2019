import React, { Component } from 'react'
import { View, LayoutAnimation } from 'react-native'
import NavigationBar from 'react-native-navbar'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../styles'

import SeasonPicker from '../components/Season/SeasonPicker'
import Season from '../components/Season/Season'
import Loading from '../components/Shared/Loading'

const titleConfig = { title: 'TISDAGSGOLFEN', tintColor: 'white' }

class Home extends Component {
  state = {
    currentSeasonId: null,
    showSeasonPicker: false
  }

  changeSeason = (currentSeasonId) => {
    this.setState({
      currentSeasonId,
      showSeasonPicker: false
    })
  }

  toggleSeasonpicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker })
  }

  render() {
    const { loading, user, seasons } = this.props.data
    if (loading) {
      return (
        <View style={styles.container}>
          <NavigationBar
            style={styles.header}
            statusBar={{ style: 'light-content', tintColor: '#000' }}
            title={titleConfig}
          />
          <Loading text="Startar golfbilarna..." />
        </View>
      )
    }

    const { currentSeasonId, showSeasonPicker } = this.state

    const season = currentSeasonId
                   ? seasons.find(s => s.id === currentSeasonId)
                   : seasons[0]

    const caret = showSeasonPicker ? '↑' : '↓'
    const rightButtonConfig = {
      title: `${season.name} ${caret}`,
      handler: () => this.toggleSeasonpicker(),
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
          statusBar={{ style: 'light-content', tintColor: '#000' }}
          title={titleConfig}
          leftButton={leftButtonConfig}
          rightButton={rightButtonConfig}
        />

        { showSeasonPicker
          ?
            <SeasonPicker
              seasons={seasons}
              currentSeasonId={season.id}
              onChangeSeason={s => this.changeSeason(s)}
            />
          : null
        }

        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'stretch' }}>
          <Season season={season} userId={user.id} />
        </View>
      </View>
    )
  }
}

const { bool, string, arrayOf, func, shape } = React.PropTypes

Home.propTypes = {
  data: shape({
    loading: bool.isRequired,
    user: shape({
      id: string
    }),
    seasons: arrayOf(shape({
      id: string,
      name: string,
      closed: bool
    }))
  }).isRequired,
  push: func.isRequired
}

const userQuery = gql`
  query {
    user {
      id
    }
    seasons: allSeasons(
      orderBy: name_DESC
    ) {
      id
      name
      closed
      photo {
        url
      }
    }
  }
`

export default graphql(userQuery)(Home)
