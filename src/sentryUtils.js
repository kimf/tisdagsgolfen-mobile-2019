import {
  Sentry,
  SentrySeverity
} from 'react-native-sentry'

export const setExtraContext = context => Sentry.setExtraContext({ ...context })

export const setTagsContext = ctx => Sentry.setTagsContext({ environment: ctx.environment })

export const setUserContext = user => Sentry.setUserContext(user)

// Function to report handled errors to Sentry
// I use this if I want to report some API failure
export const captureMessage = msg => Sentry.captureMessage(msg, { level: SentrySeverity.Error })
