import React from 'react'
import { View, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import EventCard from './EventCard';
import Loading from './Loading';
import EmptyState from './EmptyState';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const EventList = ({data}) => {
  if (data.loading)
    return <Loading text="Laddar rundor..." />

  if (data.events.length === 0)
    return <EmptyState text="Inga rundor :(" />

  return (
    <ListView
      enableEmptySections={true}
      initialListSize={100}
      dataSource={ds.cloneWithRows(data.events)}
      renderRow={(rowData) => <EventCard event={rowData} />}
    />
  )
}

const eventsQuery = gql`
query eventsQuery($currentSeasonId: ID!) {
  events: allEvents(
    orderBy: startsAt_DESC, filter: { season: { id: $currentSeasonId }}
  ) {
    id
    status
    startsAt
    course
    scoringType
    teamEvent
    oldId
  }
}
`

export default graphql(eventsQuery, {
  options: ({ season }) => ({ variables: {currentSeasonId: season.id}})
})(EventList);
