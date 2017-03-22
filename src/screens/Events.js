import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'

import EmptyState from 'shared/EmptyState'
import EventCard from 'Events/EventCard'

// import { sortedByParsedDate } from '../utils'
import { navigatorStyle } from 'styles'
import { withEventsQuery } from 'queries/eventsQuery'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const { arrayOf, shape, bool, string } = React.PropTypes

class Events extends Component {
  static navigatorButtons = {
    leftButtons: [
      { icon: require('../images/white_back.png'), id: 'back' }
    ]
  }

  static propTypes = {
    data: shape({
      loading: bool,
      events: arrayOf(EventCard.propTypes.event)
    }),
    navigator: shape().isRequired,
    userId: string.isRequired,
    seasonId: string.isRequired,
    seasonClosed: bool.isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      events: []
    }
  }

  constructor(props) {
    super(props)
    this.setButtons(props.seasonClosed)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seasonClosed && (nextProps.seasonClosed !== this.props.seasonClosed)) {
      this.setButtons(nextProps.seasonClosed)
    }
  }

  onNavigatorEvent = (event) => {
    const { seasonId } = this.props
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'add') {
        this.props.navigator.showModal({
          screen: 'tisdagsgolfen.NewEvent',
          title: 'Ny Runda',
          passProps: {
            seasonId
          },
          animated: true,
          navigatorStyle: {
            ...navigatorStyle
          }
        })
      }

      if (event.id === 'back') {
        this.props.navigator.pop()
      }
    }
  }

  setButtons = (seasonClosed) => {
    if (!seasonClosed) {
      this.props.navigator.setButtons({
        // eslint-disable-next-line import/no-unresolved
        rightButtons: [{ icon: require('../images/plus.png'), id: 'add' }],
        animated: false
      })
    }
  }

  render() {
    const { data, userId, navigator } = this.props
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
          renderRow={rowData => <EventCard userId={userId} event={rowData} navigator={navigator} />}
          enableEmptySections
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  seasonId: state.app.seasonId,
  seasonClosed: state.app.seasonClosed,
  userId: state.app.user.id
})

export default compose(
  connect(mapStateToProps),
  withEventsQuery
)(Events)
