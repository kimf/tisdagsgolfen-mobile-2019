import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import EmptyState from 'shared/EmptyState'
import EventCard from 'Events/EventCard'

// import { sortedByParsedDate } from '../utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Events extends Component {
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
          }
        })
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

const { arrayOf, shape, bool, string } = React.PropTypes

Events.propTypes = {
  data: shape({
    loading: bool,
    events: arrayOf(shape())
  }),
  navigator: shape().isRequired,
  userId: string.isRequired,
  seasonId: string.isRequired,
  seasonClosed: bool.isRequired
}

Events.defaultProps = {
  data: {
    loading: true,
    events: []
  }
}


const eventsQuery = gql`
  query($seasonId: ID!) {
    events: allEvents (
      orderBy: startsAt_DESC
      filter: { season: { id: $seasonId } }
    ) {
      id
      status
      startsAt
      oldCourseName
      course {
        id
        club
        name
      }
      scoringType
      teamEvent
    }
  }
`

const mapStateToProps = state => (
  {
    seasonId: state.app.seasonId,
    seasonClosed: state.app.seasonClosed,
    userId: state.app.user.id
  }
)

export default compose(
  connect(mapStateToProps),
  graphql(eventsQuery, {
    options: ({ seasonId }) => ({ forceFetch: false, variables: { seasonId } })
  })
)(Events)
