import { AsyncStorage } from 'react-native'

export const setCache = async (key, val) => {
  try {
    const value = await AsyncStorage.setItem(key, val)
    if (value === null)
      return false
    return value
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in setCache', e)
  }
}

export const getCache = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e)
    return null
  }
}

export const removeCache = async key => {
  try {
    await AsyncStorage.removeItem(key)
    return null
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('caught error in getCache', e)
    return null
  }
}
