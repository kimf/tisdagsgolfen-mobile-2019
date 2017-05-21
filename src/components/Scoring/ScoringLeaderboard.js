import React, { Component } from 'react'
import { View, ListView, StyleSheet } from 'react-native'
import { arrayOf, bool, func, string, shape } from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import ScoringLeaderboardCard from 'Scoring/ScoringLeaderboardCard'
import TopButton from 'shared/TopButton'
import Tabs from 'shared/Tabs'
import TGText from 'shared/TGText'
// import Header from 'shared/Header'
// import EventHeader from 'Events/EventHeader'

import { colors } from 'styles'
import { withLiveLeaderboardQuery } from 'queries/liveLeaderboardQuery'
import { rankBySorting, massageIntoLeaderboard } from 'utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    paddingTop: 40
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
    eventId: string.isRequired,
    onClose: func.isRequired,
    scoringType: string.isRequired,
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
    }
  }

  state = { sorting: 'totalPoints' }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.setState({ sorting })
  }

  render() {
    const { data, eventId, currentUserId, onClose, scoringType, teamEvent } = this.props
    const { sorting } = this.state

    let sortedPlayers = []
    if (data.scoringSessions && data.scoringSessions.length > 0) {
      const players = massageIntoLeaderboard(data.scoringSessions, teamEvent)
      sortedPlayers = rankBySorting(players, sorting, teamEvent, scoringType)
    }

    // <Header title="Ledartavla" />

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.inner}>
          {data.loading ? <TGText>Uppdaterar...</TGText> : null}
          {!teamEvent
            ? <Tabs
              currentRoute={sorting}
              onChange={sort => this.changeSort(sort)}
            />
            : null
          }
          <ListView
            removeClippedSubviews={false}
            initialListSize={20}
            dataSource={ds.cloneWithRows(sortedPlayers)}
            ref={(ref) => { this.listView = ref }}
            renderRow={rowData =>
              <ScoringLeaderboardCard
                key={`l_${currentUserId}`}
                scoringType={scoringType}
                currentUserId={currentUserId}
                player={rowData}
                eventId={eventId}
                sorting={sorting}
                teamEvent={teamEvent}
              />
            }
            enableEmptySections
          />
        </View>
        <TopButton
          backgroundColor={colors.red}
          title="STÄNG"
          onPress={() => onClose()}
        />
      </View >
    )
  }
}

const mapStateToProps = state => ({ currentUserId: state.app.currentUser.id })

export default compose(
  connect(mapStateToProps),
  withLiveLeaderboardQuery
)(ScoringLeaderboard)
