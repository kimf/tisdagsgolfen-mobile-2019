import React, { Component, PropTypes } from 'react'
import { View, ListView } from 'react-native'

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
    title: ({ state }) => state.params.title
  }

  static propTypes = {
    navigation: shape({
      state: shape({
        params: shape({
          userId: string.isRequired,
          event: eventShape.isRequired
        })
      })
    }).isRequired,
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
    const { navigation, data } = this.props
    const { event, userId } = navigation.state.params
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
              key={`l_${userId}`}
              scoringType={event.scoringType}
              currentUserId={userId}
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

export default withEventQuery(EventResult)
