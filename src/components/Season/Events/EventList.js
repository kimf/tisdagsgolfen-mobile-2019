import React from 'react'
import { View, Text, ListView } from 'react-native'
import { Link } from 'react-router-native'
import { Navigation, Card } from 'react-router-navigation'

import EventCard from './EventCard'
import EmptyState from '../../Shared/EmptyState'
import NewEventForm from './NewEventForm'
import EventResult from '../EventResult'
import EventSetup from '../EventSetup'
import { sortedByParsedDate } from '../../../utils'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const EventList = ({ events, seasonClosed, seasonId, seasonHasBeerAndKr, userId }) => {
  const sortedEvents = sortedByParsedDate(events, 'startsAt')

  const addNewButton = (
    <Link
      to="/events/new"
      underlayColor="#feb"
      style={{
        marginRight: 15
      }}
    >
      <Text style={{ color: '#fff' }}>LÄGG TILL</Text>
    </Link>
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#eee' }}>
      <Navigation
        navBarStyle={{ backgroundColor: '#2ecc71' }}
        titleStyle={{ color: '#fff' }}
      >
        <Card
          exact
          path="/events"
          renderRightButton={() => (!seasonClosed ? addNewButton : null)}
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
          onResetCard={(callback) => {
            if (this.listView) this.listView.scrollTo(0)
            callback()
          }}
        />
        <Card
          path="/events/new"
          render={() => <NewEventForm seasonId={seasonId} />}
          title="Skapa ny runda"
          backButtonStyle="light"
        />
        <Card
          exact
          path="/events/:id"
          render={(routeProps) => {
            const { match: { params } } = routeProps.history
            const eventId = params.id
            const event = events.find(e => e.id === eventId)
            const componentProps = { event, userId, seasonId, hasBeerAndKr: seasonHasBeerAndKr }

            return <EventResult {...componentProps} />
          }}
          title="Runda"
          backButtonStyle="light"
        />
        <Card
          exact
          path="/events/:id/score"
          render={(routeProps) => {
            const { match: { params } } = routeProps.history
            const eventId = params.id
            const event = events.find(e => e.id === eventId)
            const componentProps = { event, userId, seasonId, hasBeerAndKr: seasonHasBeerAndKr }

            return <EventSetup {...componentProps} />
          }}
          title="Scora"
        />
        <Card
          exact
          path="/events/:id/follow"
          render={routeProps => <View {...routeProps} />}
          title="Följ live"
        />
      </Navigation>
    </View>
  )
}

const { arrayOf, string, bool } = React.PropTypes

EventList.propTypes = {
  events: arrayOf(EventCard.propTypes.event).isRequired,
  userId: string.isRequired,
  seasonId: string.isRequired,
  seasonClosed: bool.isRequired,
  seasonHasBeerAndKr: bool.isRequired
}


export default EventList
