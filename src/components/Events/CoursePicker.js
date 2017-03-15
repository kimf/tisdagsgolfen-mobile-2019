import React, { Component, PropTypes } from 'react'
import { TextInput, View, ListView } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Fuse from 'fuse.js'

import CourseRow from 'Events/CourseRow'
import Loading from 'shared/Loading'
import EmptyState from 'shared/EmptyState'

import styles from 'styles'

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})

class CoursePicker extends Component {
  static fuse = null
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

CoursePicker.propTypes = {
  selectCourse: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    courses: PropTypes.arrayOf(PropTypes.shape())
  }).isRequired
}

const coursesQuery = gql`
   query {
    courses: allCourses ( 
      orderBy: club_ASC
    ) {
      id
      club
      name
      par
      holes: _holesMeta {
        count
      } 
    }
   }
`

export default graphql(coursesQuery)(CoursePicker)
