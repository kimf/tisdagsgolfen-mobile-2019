import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { NativeRouter } from 'react-router-native'

import client from './client'
import App from './App'

export default (
  <ApolloProvider client={ client }>
    <NativeRouter>
      <App />
    </NativeRouter>
  </ApolloProvider>
)
