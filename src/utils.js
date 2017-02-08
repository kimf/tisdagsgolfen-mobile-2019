import { AsyncStorage } from 'react-native'
import { sortBy, reverse } from 'lodash'

export const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
// avg.toLocaleString('sv', {maximumFractionDigits: 1, useGrouping:false});

export const sorted = (array, attribute) => array.sort((a, b) => b[attribute] - a[attribute]);

export const sortedByParsedDate = (array, attribute) => {
  return sorted(
    array.map(item => {
      const date = new Date(item[attribute]);
      item[attribute] = date;
      return item;
    }),
    attribute
  );
}


// ranked :: Array -> String -> Array
export const ranked = (array, attribute, rankingAttribute, reversed) => {
  const scores = array.map(x => x[rankingAttribute]);
  const rankedArr = array.map(item => {
    const newItem = Object.assign({}, item);
    newItem[attribute] = scores.indexOf(newItem[rankingAttribute]) + 1
    return newItem;
  });

  return reversed  ? rankedArr.reverse() : rankedArr;
};

const cmp = (a, b) => {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
}

export const rankedUsers = (realUsers) => {
  const rankings = [];
  const users = realUsers.slice();
  users.sort((a,b) => cmp(a.totalPoints, b.totalPoints) || cmp(a.average, b.average));

  users.reverse().forEach((user, i) => {
    if (i == 0) {
      user.position = 1
    } else if (user.totalPoints == users[i-1].totalPoints) {
      if (user.average == users[i-1].average) {
        user.position = rankings[i-1].position
      } else {
        user.position = i + 1
        rankings[i] = user
      }
    } else {
      user.position = i + 1
    }
    rankings[i] = user
  });
  return rankings;
}


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
