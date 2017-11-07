import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { bool, shape } from 'prop-types'

// import OpenSeasonEventList from 'Events/OpenSeasonEventList'
import Header from 'shared/Header'
import EventCard from 'Events/EventCard'
import EmptyState from 'shared/EmptyState'
import TouchableView from 'shared/TouchableView'

import { sortedByParsedDate } from 'utils'
import { withEventsQuery, eventsQueryProps } from 'queries/eventsQuery'
import { NAVBAR_HEIGHT, colors } from 'styles'

export class Events extends Component {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: 0,
    tabBarLabel: 'Rundor',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/calendar-filled.png')}
        style={{ tintColor, height: 22, width: 22 }}
      />
    )
  }

  static propTypes = {
    data: eventsQueryProps,
    navigation: shape().isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      events: []
    }
  }

  navigateToEvent = (screen, params) => {
    const { navigation } = this.props
    navigation.navigate(screen, { ...navigation.state.params, ...params })
  }

  render() {
    const { data } = this.props

    if (data.loading) {
      return null
    }

    const sortedEvents = data.events.length > 0 ? sortedByParsedDate(data.events, 'startsAt') : []

    return (
      <View style={{ flex: 1 }}>
        <Header title="Rundor" backgroundColor={colors.white}>
          <TouchableView
            style={{
              marginRight: -10,
              padding: 10,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={() => {
              this.props.navigation.navigate('NewEvent')
            }}
          >
            <Image style={{ tintColor: colors.muted }} source={require('../images/plus.png')} />
          </TouchableView>
        </Header>
        {sortedEvents.length === 0 ? (
          <EmptyState style={{ paddingTop: NAVBAR_HEIGHT + 20 }} text="Inga rundor :(" />
        ) : (
          <FlatList
            removeClippedSubviews={false}
            style={{ backgroundColor: colors.white, marginTop: NAVBAR_HEIGHT, padding: 10 }}
            data={sortedEvents}
            renderItem={({ item }) => <EventCard event={item} onNavigate={this.navigateToEvent} />}
            keyExtractor={item => `event_${item.id}}`}
          />
        )}
      </View>
    )
  }
}

export default withEventsQuery(Events)
