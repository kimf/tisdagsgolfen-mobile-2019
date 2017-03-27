import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import EventHeader from 'Events/EventHeader'
import EventLeaderboardCard from 'Events/EventLeaderboardCard'
import Tabs from 'shared/Tabs'
import Loading from 'shared/Loading'

import { ranked } from 'utils'
import styles from 'styles'
import { withEventQuery } from 'queries/eventQuery'
import { eventShape } from 'propTypes'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const { arrayOf, shape, string, bool } = PropTypes

class EventResult extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.title,
    header: () => ({
      visible: true
    }),
    tabBar: () => ({
      visible: false
    })
  }

  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          event: eventShape.isRequired
        })
      })
    }).isRequired,
    currentUserId: string.isRequired,
    data: shape({
      loading: bool,
      players: arrayOf(EventLeaderboardCard.propTypes.data)
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      players: []
    }
  }

  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.setState({ sorting })
  }

  render() {
    const { navigation, data, currentUserId } = this.props
    const { event } = navigation.state.params
    const { sorting } = this.state

    const eventHeader = <EventHeader {...event} />

    if (data.loading) {
      return (
        <View style={styles.container}>
          {eventHeader}
          <Loading text="Laddar resultat..." />
        </View>
      )
    }

    let sortedPlayers = null
    let sorted = null
    if (sorting === 'beers') {
      sorted = data.players.slice().sort((a, b) => b.score.beers - a.score.beers)
      sortedPlayers = ranked(sorted, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      sorted = data.players.slice().sort((a, b) => a.score.kr - b.score.kr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = data.players.slice().sort((a, b) => a.position - b.position)
    }

    return (
      <View style={styles.container}>
        {eventHeader}
        <Tabs
          currentRoute={sorting}
          onChange={sort => this.changeSort(sort)}
        />

        <ListView
          initialListSize={20}
          dataSource={ds.cloneWithRows(sortedPlayers)}
          ref={(ref) => { this.listView = ref }}
          renderRow={rowData =>
            <EventLeaderboardCard
              key={`l_${currentUserId}`}
              scoringType={event.scoringType}
              currentUserId={currentUserId}
              data={rowData}
              sorting={sorting}
            />
          }
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({ currentUserId: state.app.currentUser.id })

export default compose(
  connect(mapStateToProps),
  withEventQuery
)(EventResult)
