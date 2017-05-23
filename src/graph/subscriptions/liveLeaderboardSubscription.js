import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const liveLeaderboardSubscription = gql`
  subscription liveLeaderboardSubscription($eventId: ID!) {
    LiveScore(
      filter: {
        mutation_in: [UPDATED, CREATED, DELETED],
        node: {event: {id: $eventId}}
      }
    ) {
      node {
        event {
          scoringSessions {
            scoringPlayers {
              id
              liveScores {
                id
                beers
                points
                putts
                strokes
                hole {
                  id
                  par
                }
              }
              user {
                id
                firstName
                lastName
                photo {
                  url
                }
              }
            }
            scoringTeams {
              id
              liveScores {
                id
                beers
                points
                putts
                strokes
                hole {
                  id
                  par
                }
              }
              users {
                id
                firstName
                lastName
                photo {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`

export default liveLeaderboardSubscription

export const withLiveLeaderboardSubscription = graphql(liveLeaderboardSubscription, {
  options: ({ eventId }) => ({
    variables: { eventId }
  })
})
