import React from 'react'
import { ApolloProvider } from 'react-apollo'

import client from './client'
import TisdagsGolfen from './TisdagsGolfen'

export default (
  <ApolloProvider client={ client }>
    <TisdagsGolfen />
  </ApolloProvider>
)


