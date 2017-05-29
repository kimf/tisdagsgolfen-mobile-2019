import React, { Component } from 'react'
import { Animated, View, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { bool, shape } from 'prop-types'

// import OpenSeasonEventList from 'Events/OpenSeasonEventList'
import AnimatedHeader from 'shared/AnimatedHeader'
import EventCard from 'Events/EventCard'
import EmptyState from 'shared/EmptyState'
import TouchableView from 'shared/TouchableView'

import { sortedByParsedDate } from 'utils'
import { withEventsQuery, eventsQueryProps } from 'queries/eventsQuery'
import { userShape } from 'propTypes'
import { NAVBAR_HEIGHT, colors } from 'styles'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

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
    currentUser: userShape.isRequired,
    seasonClosed: bool.isRequired,
    navigation: shape().isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      events: []
    }
  }

  constructor() {
    super()

    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  navigateToEvent = (screen, params) => {
    const navigation = this.props.navigation
    navigation.navigate(screen, { ...this.props.navigation.state.params, ...params })
  }

  render() {
    const { data, currentUser, seasonClosed } = this.props
    const scrollY = this.state.scrollY

    if (data.loading) {
      return null
    }

    const sortedEvents = data.events.length > 0 ? sortedByParsedDate(data.events, 'startsAt') : []

    const paddingTop = scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [90, 60],
      extrapolate: 'clamp'
    })

    const marginTop = scrollY.interpolate({
      inputRange: [0, 40],
      outputRange: [-20, 0],
      extrapolate: 'clamp'
    })

    return (
      <View style={{ flex: 1 }}>
        <AnimatedHeader
          scrollY={scrollY}
          title="Rundor"
        >
          {seasonClosed
            ? null
            : <TouchableView
              style={{
                marginRight: -10,
                padding: 10,
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                transform: [{ translateY: marginTop }]
              }}
              onPress={() => { this.props.navigation.navigate('NewEvent') }}
            >
              <Image
                style={{ tintColor: colors.muted }}
                source={require('../images/plus.png')}
              />
            </TouchableView>
          }
        </AnimatedHeader>
        {sortedEvents.length === 0
          ? <EmptyState style={{ paddingTop: NAVBAR_HEIGHT + 20 }} text="Inga rundor :(" />
          : <AnimatedFlatList
            removeClippedSubviews={false}
            style={{ padding: 10, transform: [{ translateY: paddingTop }] }}
            data={sortedEvents}
            renderItem={({ item }) => (
              <EventCard userId={currentUser.id} event={item} onNavigate={this.navigateToEvent} />
            )}
            keyExtractor={item => `event_${item.id}}`}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  seasonId: state.app.currentSeason.id,
  seasonClosed: state.app.currentSeason.closed,
  currentUser: state.app.currentUser
})

export default compose(
  connect(mapStateToProps),
  withEventsQuery
)(Events)
