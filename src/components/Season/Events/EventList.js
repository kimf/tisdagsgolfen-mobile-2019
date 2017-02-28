import React from 'react'
import { View, Text, ListView } from 'react-native'
import { Navigation, Card } from 'react-router-navigation'

import { Link } from '../../../Link'
import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'
import NewEventForm from './NewEventForm'
import Event from '../Event'

import { sortedByParsedDate } from '../../../utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const addNewButton = (seasonClosed) => {
  if (seasonClosed) {
    return null
  }
  return (
    <View style={{ flex: 1 }}>
      <Link
        replace
        to="/events/new"
        underlayColor="#f0f0f0"
        style={{
          flex: 1,
          width: 200,
          height: 40,
          paddingVertical: 10,
          margin: 10
        }}
      >
        <Text style={{ padding: 15, paddingLeft: 0, color: '#000' }}>+ Lägg till ny runda</Text>
      </Link>
    </View>
  )
}

// {addNewButton(seasonClosed)}

const EventList = ({ events, seasonClosed, seasonId, userId }) => {
  const sortedEvents = sortedByParsedDate(events, 'startsAt')

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <Navigation>
        <Card
          exact
          path="/events"
          render={() => {
            if (events.length === 0) {
              return <EmptyState text="Inga rundor :(" />
            }

            return (
              <ListView
                ref={(c) => { this.listView = c }}
                initialListSize={100}
                dataSource={ds.cloneWithRows(sortedEvents)}
                renderRow={rowData => <EventCard event={rowData} />}
                enableEmptySections
              />
            )
          }}
          title="Rundor"
          navBarStyle={{ backgroundColor: '#11111F' }}
          titleStyle={{ color: '#fff' }}
          onResetCard={(callback) => {
            if (this.listView) this.listView.scrollTo(0)
            callback()
          }}
        />
        <Card
          path="/events/new"
          render={props => <NewEventForm seasonId={props.season.id} />}
          title="Item"
          navBarStyle={{ backgroundColor: '#11111F' }}
          titleStyle={{ color: '#fff' }}
          backButtonStyle="light"
        />
        <Card
          path="/events/:id"
          render={(props) => {
            const { match: { params } } = props
            const eventId = params.id
            const event = events.find(e => e.id === eventId)
            return <Event event={event} userId={userId} seasonId={seasonId} />
          }}
          title="Runda"
          navBarStyle={{ backgroundColor: '#11111F' }}
          titleStyle={{ color: '#fff' }}
          backButtonStyle="light"
        />
      </Navigation>
    </View>
  )
}

const { arrayOf, string, bool, shape } = React.PropTypes

EventList.propTypes = {
  events: arrayOf(shape()).isRequired,
  userId: string.isRequired,
  seasonId: string.isRequired,
  seasonClosed: bool.isRequired
}


export default EventList
