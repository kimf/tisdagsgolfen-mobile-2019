import React, { Component, PropTypes } from 'react'
import { TextInput, View, ListView } from 'react-native'
import Fuse from 'fuse.js'

import CourseRow from 'Events/CourseRow'
import Loading from 'shared/Loading'
import EmptyState from 'shared/EmptyState'

import styles from 'styles'
import { withCoursesQuery } from 'queries/coursesQuery'

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})

const { arrayOf, shape, func } = PropTypes

class CoursePicker extends Component {
  static fuse = null

  static propTypes = {
    selectCourse: func.isRequired,
    data: shape({
      loading: true,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.courses && nextProps.data.courses.length > 0) {
      this.fuse = new Fuse(
        nextProps.data.courses,
        {
          shouldSort: true,
          minMatchCharLength: 2,
          maxPatternLength: 10,
          keys: ['name', 'club']
        }
      )
    }
  }

  setSearchQuery = (query) => {
    this.setState({ query })
  }

  render() {
    const { data } = this.props
    const { query } = this.state

    if (data.loading) {
      return <Loading text="Laddar banor..." />
    }

    if (data.courses.length === 0) {
      return <EmptyState text="Inga banor :(" />
    }

    let courses = []
    if (this.fuse && query !== null && query.length > 2) {
      const filtered = this.fuse.search(query)
      courses = ds.cloneWithRows(filtered)
    } else {
      courses = ds.cloneWithRows(data.courses)
    }

    return (
      <View style={[styles.container]}>
        <View style={styles.inlineHeader}>
          <TextInput
            style={styles.inputField}
            autoCapitalize="words"
            autoCorrect={false}
            placeholder="Sök klubb"
            returnKeyType="search"
            onChangeText={q => this.setSearchQuery(q)}
            value={query}
          />
        </View>
        <ListView
          dataSource={courses}
          renderRow={rowData =>
            <CourseRow course={rowData} selectCourse={this.props.selectCourse} />
          }
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }
}

export default withCoursesQuery(CoursePicker)
