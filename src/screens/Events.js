import React, { Component } from 'react'
import { View, Image, ListView } from 'react-native'

import EmptyState from 'shared/EmptyState'
import EventCard from 'Events/EventCard'
import TouchableView from 'shared/TouchableView'
// import { sortedByParsedDate } from '../utils'
import { withEventsQuery } from 'queries/eventsQuery'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const { arrayOf, shape, bool, string } = React.PropTypes

// { icon: require('../images/white_back.png'), id: 'back' }
// { icon: require('../images/plus.png'), id: 'add' }
class Events extends Component {
  static navigationOptions = {
    header: ({ state, navigate }) => {
      let right = null
      if (!state.params.seasonClosed) {
        right = (
          <TouchableView
            style={{ paddingVertical: 10, paddingHorizontal: 20 }}
            onPress={() => navigate('NewEvent', state.params)}
          >
            <Image source={require('../images/plus.png')} />
          </TouchableView>
        )
      }
      const title = 'Rundor'
      return { right, title }
    },
    gestureResponseDistance: 0
  }

  static propTypes = {
    data: shape({
      loading: bool,
      events: arrayOf(EventCard.propTypes.event)
    }),
    navigation: shape({
      state: shape({
        params: shape({
          user: shape({
            id: string.isRequired
          }).isRequired,
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

  navigateToEvent = (screen, params) => {
    const navigation = this.props.navigation
    navigation.navigate(screen, { ...this.props.navigation.state.params, ...params })
  }

  render() {
    const { data, navigation } = this.props
    const userId = navigation.state.params.user.id

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
            <EventCard userId={userId} event={rowData} onNavigate={this.navigateToEvent} />
          )}
          enableEmptySections
        />
      </View>
    )
  }
}

export default withEventsQuery(Events)
