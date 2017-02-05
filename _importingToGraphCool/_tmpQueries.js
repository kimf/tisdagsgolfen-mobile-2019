const _ = require('lodash')
const {Lokka} = require('lokka')
const {Transport} = require('lokka-transport-http')

// set timezone to UTC (needed for Graphcool)
process.env.TZ = 'UTC'

const client = new Lokka({
  transport: new Transport(
    'https://api.graph.cool/simple/v1/ciyqax2o04t37012092ntrd7e',
    {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODYyNDc2NTQsImNsaWVudElkIjoiY2l5cWFoZmI5NHNrMjAxMjA5bWJ4b2FzcSIsInByb2plY3RJZCI6ImNpeXFheDJvMDR0MzcwMTIwOTJudHJkN2UiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNpeXJ0aDl6NjVoZm8wMTMydWVzMXBzcWwifQ.0GnTlwX9vjWx_WCWjGm9bIjck9HwcSGKK2vr74nKnW4',
    }
   )
});

const users = [
  {
    "id": "ciyruvmpb8nu20171zwer1sgm",
    "oldId": "135596"
  },
  {
    "id": "ciyruvmpd8nu401713tjujg0m",
    "oldId": "135584"
  },
  {
    "id": "ciyruvmrm8nwf0171qu1l2j6d",
    "oldId": "135569"
  },
  {
    "id": "ciyruvms38nwh0171hov333vz",
    "oldId": "135564"
  },
  {
    "id": "ciyruvms58nwj0171frq1tp58",
    "oldId": "135599"
  },
  {
    "id": "ciyruvmtf8nwl01710gr1zi2j",
    "oldId": "135563"
  },
  {
    "id": "ciyruvmtx8nwn017167tw3lwx",
    "oldId": "135585"
  },
  {
    "id": "ciyruvmu08nwp0171x3i4fpbh",
    "oldId": "135597"
  },
  {
    "id": "ciyruvmwd8nwr0171iyxdx57b",
    "oldId": "135600"
  },
  {
    "id": "ciyruvmwu8nwt01711giqa76c",
    "oldId": "135820"
  },
  {
    "id": "ciyruvnnb4klu0170rdae03ev",
    "oldId": "135578"
  },
  {
    "id": "ciyruvnnw4klw0170cn2xbbmw",
    "oldId": "135567"
  },
  {
    "id": "ciyruvnov4kn401700syysk64",
    "oldId": "135575"
  },
  {
    "id": "ciyruvnpu4koa0170etthu4hg",
    "oldId": "135587"
  },
  {
    "id": "ciyruvnq14koc0170pkxaov6q",
    "oldId": "135565"
  },
  {
    "id": "ciyruvnr34koe01701suknsna",
    "oldId": "135566"
  },
  {
    "id": "ciyruvnsv4kog0170ydwgjguw",
    "oldId": "135570"
  },
  {
    "id": "ciyruvntr4koi0170pm5wrcdu",
    "oldId": "135583"
  },
  {
    "id": "ciyruvnuz4kok0170ik9oc9ey",
    "oldId": "135896"
  },
  {
    "id": "ciyruvnv94kom0170sqwozg6j",
    "oldId": "135568"
  }
]


// convert to ISO 8601 format
const convertToDateTimeString = (str) => {
  try {
    return new Date(Date.parse(str)).toISOString()
  } catch(e) {
    return null;
  }
}


const createSeason = async(season) => {
  const result = await client.mutate(`{
    season: createSeason(
      oldId: ${season.id}
      name: "2018"
      closed: ${season.closed_at !== null ? true : false}
    ) {
      id
    }
  }`)

  return result.season.id
}

const createEvent = async(event) => {
  const result = await client.mutate(`{
    event: createEvent(
      oldId: ${event.id}
      course: "${event.course}"
      scoringType: "${event.scoring_type}"
      startsAt: "${convertToDateTimeString(event.starts_at)}"
      status: "${event.status}"
      teamEvent: ${event.team_event}
    ) {
      id
    }
  }`)

  return result.event.id
}

const createScore = async(score) => {
  const result = await client.mutate(`{
    score: createScore(
      oldId: ${score.user.id}
      value: ${score.points}
      eventPoints: ${score.event_points}
      kr: ${score.kr}
      beers: ${score.beers}
    ) {
      id
    }
  }`)

  return result.score.id
}

// maps from old imported id (data set) to new generated id (Graphcool)
const createSeasons = async(rawSeasons) => {
  const seasonIds = await Promise.all(rawSeasons.map(createSeason))

  return _.zipObject(rawSeasons.map(season => season.id), seasonIds)
}

const createEvents = async(rawEvents) => {
  const eventIds = await Promise.all(rawEvents.map(createEvent))

  return _.zipObject(rawEvents.map(event => event.id), eventIds)
}

const createScores = async(rawScores) => {
  const scoreIds = await Promise.all(rawScores.map(createScore))

  return _.zipObject(rawScores.map(score => score.id), scoreIds)
}

const connectSeasonsAndEventsMutation = (seasonId, eventId) => (
  client.mutate(`{
    addToSeasonEvent(seasonSeasonId: "${seasonId}" eventsEventId: "${eventId}") {
      # we don't need this but we need to return something
      seasonSeason {
        id
      }
    }
  }`)
)

const connectEventsAndScoresMutation = (eventId, scoreId) => (
  client.mutate(`{
    addToEventScore(eventEventId: "${eventId}" scoresScoreId: "${scoreId}") {
      # we don't need this but we need to return something
      eventEvent {
        id
      }
    }
  }`)
)

const connectScoresAndUsersMutation = (userId, scoreId) => (
  client.mutate(`{
    addToUserScore(userUserId: "${userId}" scoresScoreId: "${scoreId}") {
      # we don't need this but we need to return something
      scoresScore {
        id
      }
    }
  }`)
)

const main = async() => {
  const rawSeasons = require('./jsonFromServer.json').seasons
  // const rawSeasons = require('./seasons.json').seasons

  const allEvents = _.chain(rawSeasons)
    .flatMap(rawSeason => rawSeason.events)
    .uniqBy(event => event.id)
    .value()

  const allScores = _.chain(allEvents)
    .flatMap(rawEvent => rawEvent.scores)
    .uniqBy(score => score.id)
    .value()

  const allUsers = _.chain(allScores)
    .flatMap(rawScore => rawScore.user)
    .uniqBy(user => user.id)
    .value()

  // create scores
  const scoreIdMap = await createScores(allScores)
  console.log(`Created ${Object.keys(scoreIdMap).length} scores`)

  // create events
  const eventIdMap = await createEvents(allEvents)
  console.log(`Created ${Object.keys(eventIdMap).length} events`)

  // create seasons
  const seasonIdMap = await createSeasons(rawSeasons)
  console.log(`Created ${Object.keys(seasonIdMap).length} seasons`)

  // connect seasons and events
  const mutations = _.chain(rawSeasons)
    .flatMap((rawSeason) => {
      const newEventIds = rawSeason.events.map((event) => eventIdMap[event.id])
      const newSeasonId = seasonIdMap[rawSeason.id]

      return newEventIds.map((newEventId) => ({newEventId, newSeasonId}))
    })
    .map(({newEventId, newSeasonId}) => {
      console.log(newEventId, newSeasonId);
      connectSeasonsAndEventsMutation(newSeasonId, newEventId)
    })
    .value()

  await Promise.all(mutations)
  console.log(`Created ${mutations.length} edges between seasons and events`)


  // connect events and scores
  const mutations_two = _.chain(allEvents)
    .flatMap((rawEvent) => {
      const newScoreIds = rawEvent.scores.map((score) => scoreIdMap[score.id])
      const newEventId = eventIdMap[rawEvent.id]

      return newScoreIds.map((newScoreId) => ({newEventId, newScoreId}))
    })
    .map(({newEventId, newScoreId}) => {
      console.log(newEventId, newScoreId);
      connectEventsAndScoresMutation(newEventId, newScoreId)
    })
    .value()

  await Promise.all(mutations_two)
  console.log(`Created ${mutations_two.length} edges between events and scores`)

  // connect scores and users
  const mutations_three = _.chain(allScores)
    .flatMap((rawScore) => {
      const oldUserId = rawScore.user.id
      const newScoreId = scoreIdMap[rawScore.id]

      const newUserId = users.find(u => u.oldId === oldUserId).id

      return {newUserId, newScoreId}
    })
    .map(({newUserId, newScoreId}) => {
      console.log(newUserId, newScoreId);
      connectScoresAndUsersMutation(newUserId, newScoreId)
    })
    .value()

  await Promise.all(mutations_three)
  console.log(`Created ${mutations_three.length} edges between scores and users`)
}

main().catch((e) => console.error(e))
