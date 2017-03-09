import React from 'react'
import { View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import EmptyState from '../components/Shared/EmptyState'
import EventCard from '../components/Season/Events/EventCard'
// import NewEventForm from '../components/Season/Events/NewEventForm'
// import EventResult from '../components/Season/EventResult'
// import EventSetup from '../components/Season/EventSetup'
// import { sortedByParsedDate } from '../utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const EventList = ({ data, userId, navigator }) => {
  // const addNewButton = (
  //   <Link
  //     to="/events/new"
  //     underlayColor="#feb"
  //     style={{
  //       marginRight: 15
  //     }}
  //   >
  //     <Text style={{ color: '#fff' }}>LÄGG TILL</Text>
  //   </Link>
  // )

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
        renderRow={rowData => <EventCard userId={userId} event={rowData} push={navigator.push} />}
        enableEmptySections
      />
    </View>
  )
}

const { arrayOf, shape, bool, string, func } = React.PropTypes

EventList.propTypes = {
  data: shape({
    loading: bool,
    events: arrayOf(EventCard.propTypes.event)
  }),
  navigator: shape({
    push: func.isRequired
  }).isRequired,
  userId: string.isRequired
}

EventList.defaultProps = {
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
      course
      courseId
      scoringType
      teamEvent
    }
  }
`

const mapStateToProps = state => (
  {
    seasonId: state.app.seasonId,
    userId: state.app.user.id
  }
)

export default compose(
  connect(mapStateToProps),
  graphql(eventsQuery, {
    options: ({ seasonId }) => ({ forceFetch: false, variables: { seasonId } })
  })
)(EventList)
