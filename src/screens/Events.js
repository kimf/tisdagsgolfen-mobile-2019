import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

// import OpenSeasonEventList from 'Events/OpenSeasonEventList'
import ClosedSeasonEventList from 'Events/ClosedSeasonEventList'
import EmptyState from 'shared/EmptyState'
import Header from 'shared/Header'
import TouchableView from 'shared/TouchableView'

// import { sortedByParsedDate } from '../utils'
import { withEventsQuery, eventsQueryProps } from 'queries/eventsQuery'
import { userShape } from 'propTypes'
import { NAVBAR_HEIGHT, colors } from 'styles'

const { bool, shape } = React.PropTypes

export class Events extends Component {
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
    header: () => ({
      visible: false
    }),
    gestureResponseDistance: 0
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

  navigateToEvent = (screen, params) => {
    const navigation = this.props.navigation
    navigation.navigate(screen, { ...this.props.navigation.state.params, ...params })
  }

  render() {
    const { data, currentUser, seasonClosed } = this.props

    if (data.loading) {
      return null
    }

    if (data.events.length === 0) {
      return <EmptyState style={{ paddingTop: NAVBAR_HEIGHT + 20 }} text="Inga rundor :(" />
    }

    // const sortedEvents = sortedByParsedDate(events, 'startsAt')

    // const ListComponent = seasonClosed ? ClosedSeasonEventList : OpenSeasonEventList
    const ListComponent = ClosedSeasonEventList

    return (
      <View style={{ flex: 1, paddingTop: NAVBAR_HEIGHT }}>
        <Header title="Rundor">
          {seasonClosed
            ? null
            : <TouchableView
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
                style={{ tintColor: colors.muted }}
                source={require('../images/plus.png')}
              />
            </TouchableView>
          }
        </Header>
        <ListComponent
          events={data.events}
          userId={currentUser.id}
          onNavigate={this.navigateToEvent}
        />
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
