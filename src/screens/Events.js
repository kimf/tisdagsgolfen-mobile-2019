import React, { Component } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import EmptyState from 'shared/EmptyState'
import EventCard from 'Events/EventCard'
import Header from 'shared/Header'
import TouchableView from 'shared/TouchableView'

// import { sortedByParsedDate } from '../utils'
import { withEventsQuery, eventsQueryProps } from 'queries/eventsQuery'
import { userShape } from 'propTypes'
import { NAVBAR_HEIGHT, colors } from 'styles'

const { shape } = React.PropTypes

class Events extends Component {
  static navigationOptions = {
    tabBar: () => ({
      label: 'Rundor',
      icon: ({ tintColor }) => (
        <Image
          source={require('../images/calendar-filled.png')}
          style={{ tintColor, height: 22, width: 22 }}
        />
      )
    }),
    gestureResponseDistance: 0
  }

  static propTypes = {
    data: eventsQueryProps,
    currentUser: userShape.isRequired,
    navigation: shape().isRequired
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
    const { data, currentUser } = this.props

    if (data.loading) {
      return null
    }

    if (data.events.length === 0) {
      return <EmptyState style={{ paddingTop: NAVBAR_HEIGHT + 20 }} text="Inga rundor :(" />
    }

    // const sortedEvents = sortedByParsedDate(events, 'startsAt')

    return (
      <View style={{ flex: 1, backgroundColor: colors.green, paddingTop: NAVBAR_HEIGHT }}>
        <Header
          title="Rundor"
          backgroundColor={colors.green}
        >
          <TouchableView
            style={{
              marginTop: -40,
              marginRight: -10,
              padding: 10,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            onPress={() => { this.props.navigation.navigate('NewEvent') }}
          >
            <Image
              style={{ tintColor: '#fff' }}
              source={require('../images/plus.png')}
            />
          </TouchableView>
        </Header>
        <ScrollView
          style={{ paddingHorizontal: 5 }}
          ref={(c) => { this.listView = c }}
          initialListSize={10}
          scrollEventThrottle={1}
        >
          {data.events.map(event => (
            <EventCard key={`event_${event.id}}`} userId={currentUser.id} event={event} onNavigate={this.navigateToEvent} />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  seasonId: state.app.currentSeason.id,
  currentUser: state.app.currentUser
})

export default compose(
  connect(mapStateToProps),
  withEventsQuery
)(Events)
