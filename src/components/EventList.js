import React from 'react'
import { View, ListView } from 'react-native'
import { graphql } from 'react-apollo'

import EventCard from './EventCard';
import Loading from './Loading';
import EmptyState from './EmptyState';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const EventList = ({events}) => {
  if (events.length === 0)
    return <EmptyState text="Inga rundor :(" />

  return (
    <ListView
      enableEmptySections={true}
      initialListSize={100}
      dataSource={ds.cloneWithRows(events)}
      renderRow={(rowData) => <EventCard event={rowData} />}
    />
  )
}

export default EventList;
