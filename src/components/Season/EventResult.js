import React, { Component } from 'react'
import { FlatList } from 'react-native'
import { arrayOf, string } from 'prop-types'

import EventLeaderboardCard from '../Events/EventLeaderboardCard'

import { ranked } from '../../utils'

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
    const { sorting, currentUserId, scoringType, players, seasonId, eventId } = this.props

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
      <FlatList
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        initialListSize={10}
        data={sortedPlayers}
        renderItem={({ item }) => (
          <EventLeaderboardCard
            key={`l_${currentUserId}_${seasonId}`}
            scoringType={scoringType}
            currentUserId={currentUserId}
            data={item}
            sorting={sorting}
          />
        )}
        keyExtractor={player => `l_${seasonId}_${eventId}_${player.id}`}
      />
    )
  }
}

export default EventResult
