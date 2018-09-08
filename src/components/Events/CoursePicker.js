import React, { Component } from 'react'
import { TextInput, View, FlatList } from 'react-native'
import { arrayOf, bool, shape, func } from 'prop-types'

import CourseRow from './CourseRow'
import Loading from '../shared/Loading'
import EmptyState from '../shared/EmptyState'
import SubHeader from '../shared/SubHeader'

import styles, { colors } from '../../styles'
import { cacheable } from '../../utils'
import { withCoursesQuery } from '../../graph/queries/coursesQuery'

const fixString = stringToFix =>
  stringToFix
    .trim()
    .replace(/-/g, '')
    .replace(/ /g, '')
    .toLowerCase()

const filterCourses = cacheable((courses, query) =>
  courses
    .filter(c => {
      const searchString = fixString(`${c.club}${c.name}`)
      const trimmedQuery = fixString(query)
      return searchString.indexOf(trimmedQuery) !== -1
    })
    .sort((a, b) => b.eventCount - a.eventCount)
    .sort((a, b) => a.club - b.club)
)

const getPreviouslyPlayedCourses = cacheable(courses =>
  courses.filter(c => c.eventCount > 3).sort((a, b) => b.eventCount - a.eventCount)
)

class CoursePicker extends Component {
  static propTypes = {
    selectCourse: func.isRequired,
    data: shape({
      loading: bool,
      courses: arrayOf(shape())
    })
  }

  static defaultProps = {
    data: {
      loading: true,
      courses: []
    }
  }

  state = { query: '' }

  setSearchQuery = query => this.setState(state => ({ ...state, query }))

  render() {
    const { data, selectCourse } = this.props
    const { query } = this.state

    if (data.loading) {
      return <Loading text="Laddar banor..." />
    }

    if (data.courses.length === 0) {
      return <EmptyState text="Inga banor :(" />
    }

    let courses = []
    let previously = false
    if (query !== '' && query.length > 1) {
      previously = false
      courses = filterCourses(data.courses, query)
    } else {
      previously = true
      courses = getPreviouslyPlayedCourses(data.courses)
    }

    return (
      <View style={styles.container}>
        <View style={styles.inlineHeader}>
          <TextInput
            style={styles.inputField}
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Sök bana eller klubb"
            returnKeyType="search"
            onChangeText={q => this.setSearchQuery(q)}
            value={query}
          />
        </View>

        {previously ? (
          <View
            style={{
              paddingVertical: 20,
              marginHorizontal: 20,
              borderBottomWidth: 2,
              borderBottomColor: colors.lightGray
            }}>
            <SubHeader title="Vanliga banor" />
          </View>
        ) : null}

        <FlatList
          removeClippedSubviews={false}
          style={{ paddingHorizontal: 20 }}
          data={courses}
          renderItem={({ item }) => <CourseRow course={item} selectCourse={selectCourse} />}
          keyExtractor={item => `course_${item.id}}`}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }
}

export default withCoursesQuery(CoursePicker)
