import React, { Component } from 'react'
import { ListView } from 'react-native'
import { arrayOf, string } from 'prop-types'

import EventLeaderboardCard from 'Events/EventLeaderboardCard'

import { ranked } from 'utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class EventResult extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerVisible: true,
    tabBarVisible: false
  })

  static propTypes = {
    currentUserId: string,
    scoringType: string.isRequired,
    sorting: string.isRequired,
    players: arrayOf(EventLeaderboardCard.propTypes.data).isRequired,
    seasonId: string.isRequired,
    eventId: string.isRequired
  }

  static defaultProps = {
    currentUserId: null
  }

  render() {
    const {
      sorting, currentUserId, scoringType, players, seasonId, eventId
    } = this.props

    let sortedPlayers = null
    let sorted = null
    if (sorting === 'beers') {
      sorted = players.slice().sort((a, b) => b.beers - a.beers)
      sortedPlayers = ranked(sorted, 'beerPos', 'beers')
    } else if (sorting === 'kr') {
      sorted = players.slice().sort((a, b) => a.kr - b.kr)
      sortedPlayers = ranked(sorted, 'krPos', 'kr')
    } else {
      sortedPlayers = players.slice().sort((a, b) => a.position - b.position)
    }

    return (
      <ListView
        removeClippedSubviews={false}
        initialListSize={20}
        dataSource={ds.cloneWithRows(sortedPlayers)}
        renderRow={rowData => (
          <EventLeaderboardCard
            key={`l_${currentUserId}_${eventId}_${seasonId}`}
            scoringType={scoringType}
            currentUserId={currentUserId}
            data={rowData}
            sorting={sorting}
          />
        )}
        enableEmptySections
      />
    )
  }
}

export default EventResult
