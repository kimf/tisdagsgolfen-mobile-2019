import React, { Component } from 'react'
import { View, ListView } from 'react-native'

import EmptyState from 'shared/EmptyState'
import EventCard from 'Events/EventCard'

// import { sortedByParsedDate } from '../utils'
import { withEventsQuery } from 'queries/eventsQuery'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const { arrayOf, shape, bool, string } = React.PropTypes

// { icon: require('../images/white_back.png'), id: 'back' }
// { icon: require('../images/plus.png'), id: 'add' }
class Events extends Component {
  static propTypes = {
    data: shape({
      loading: bool,
      events: arrayOf(EventCard.propTypes.event)
    }),
    navigation: shape({
      state: shape({
        params: shape({
          userId: string.isRequired,
          seasonId: string.isRequired,
          seasonClosed: bool.isRequired
        })
      })
    }).isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      events: []
    }
  }

  onNavigatorEvent = (event) => {
    const { seasonId } = this.props.navigation.state.params
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'add') {
        this.props.navigation.navigate('NewEvent', { seasonId })
      }
      if (event.id === 'back') {
        this.props.navigation.goBack()
      }
    }
  }

  render() {
    const { data, navigation } = this.props
    const { userId } = navigation.state.params

    if (data.loading) {
      return null
    }

    if (data.events.length === 0) {
      return <EmptyState text="Inga rundor :(" />
    }

    // const sortedEvents = sortedByParsedDate(events, 'startsAt')

    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <ListView
          ref={(c) => { this.listView = c }}
          initialListSize={100}
          dataSource={ds.cloneWithRows(data.events)}
          renderRow={rowData => (
            <EventCard userId={userId} event={rowData} navigation={navigation} />
          )}
          enableEmptySections
        />
      </View>
    )
  }
}

export default withEventsQuery(Events)
