import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { arrayOf, bool, func, string, shape, number } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import ScoringLeaderboardCard from 'Scoring/ScoringLeaderboardCard'
import ScorecardHeaderRow from 'Scoring/ScorecardHeaderRow'
import Header from 'shared/Header'
import TopButton from 'shared/TopButton'
import Tabs from 'shared/Tabs'
// import Header from 'shared/Header'
// import EventHeader from 'Events/EventHeader'

import { colors, NAVBAR_HEIGHT } from 'styles'
import { withLiveLeaderboardQuery } from 'queries/liveLeaderboardQuery'
import { rankBySorting, massageIntoLeaderboard } from 'utils'

const styles = StyleSheet.create({
  inner: {
    flex: 1
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20
  }
})

class ScoringLeaderboard extends Component {
  static propTypes = {
    currentUserId: string.isRequired,
    scoringSessionId: string.isRequired,
    onClose: func,
    scoringType: string.isRequired,
    showHeader: bool,
    showClose: bool,
    teamEvent: bool.isRequired,
    data: shape({
      loading: bool,
      scoringSessions: arrayOf(shape()) // TODO: How do we want the data to look?
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      scoringSessions: []
    },
    showClose: true,
    showHeader: false,
    onClose: null
  }

  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    this.listView.scrollToIndex({ index: 0 })
    this.setState({ sorting })
  }

  render() {
    const {
      data,
      scoringSessionId,
      currentUserId,
      onClose,
      showClose,
      showHeader,
      scoringType,
      teamEvent
    } = this.props
    const { sorting } = this.state

    let sortedPlayers = []
    if (data.scoringSessions && data.scoringSessions.length > 0) {
      const players = massageIntoLeaderboard(data.scoringSessions, teamEvent)
      sortedPlayers = rankBySorting(players, sorting, teamEvent, scoringType)
    }

    // TODO: Show tabs for teamEvents when you figured out how to solve the beers part
    return (
      <View style={{ flex: 1 }}>
        {showHeader ? <Header title="Ledartavla" /> : null}
        <View style={[styles.inner, { marginTop: showHeader ? NAVBAR_HEIGHT : 0 }]}>
          {teamEvent ? null : (
            <Tabs
              teamEvent={teamEvent}
              currentRoute={sorting}
              onChange={sort => this.changeSort(sort)}
              scoringType={scoringType}
            />
          )}

          {sorting === 'totalPoints' ? (
            <ScorecardHeaderRow scoring={false} scoringType={scoringType} teamEvent={teamEvent} />
          ) : null}

          <FlatList
            removeClippedSubviews={false}
            data={sortedPlayers}
            ref={(ref) => {
              this.listView = ref
            }}
            renderItem={({ item }) => (
              <ScoringLeaderboardCard
                key={`l_${currentUserId}`}
                scoringType={scoringType}
                currentUserId={currentUserId}
                player={item}
                scoringSessionId={scoringSessionId}
                sorting={sorting}
                teamEvent={teamEvent}
              />
            )}
            keyExtractor={item => `leaderboardPlayer_${item.id}}`}
          />
        </View>
        {showClose ? (
          <TopButton backgroundColor={colors.red} title="STÄNG" onPress={() => onClose()} />
        ) : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({ currentUserId: state.app.currentUser.id })

export default compose(connect(mapStateToProps), withLiveLeaderboardQuery)(ScoringLeaderboard)
