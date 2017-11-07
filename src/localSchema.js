import gql from 'graphql-tag'

const nextTodoId = 0
export default {
  Query: {
    currentUser: () => {}
  },
  Mutation: {
    setCurrentUser: (_, { email, token }, { cache }) => {
      cache.writeQuery({
        query: gql`
          {
            currentUser @client
          }
        `,
        data: { email, token }
      })
      return { currentUser: { email, token } }
    }
  }
}
