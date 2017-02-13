import React, { Component, PropTypes } from 'react'
import { Text, TextInput, TouchableOpacity, View, ListView } from 'react-native'

import styles from '../../../styles'
import clubsJson from '../../../data/clubs.json'

const filter = (data, query) => Object.keys(data)
  .filter(key => key.toLowerCase().indexOf(query) !== -1)
  .reduce((obj, key) => {
    const newObj = Object.assign({}, obj)
    newObj[key] = clubsJson[key]
    return newObj
  }, {})

const renderSectionHeader = (sectionData, sectionID) =>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{sectionID}</Text>
  </View>

const CourseRow = ({ course, selectCourse }) =>
  <TouchableOpacity onPress={() => selectCourse(course)} key={`course_row_${course.id}`}>
    <View style={styles.courserow}>
      <Text>{course.name} {course.par}</Text>
    </View>
  </TouchableOpacity>

CourseRow.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string.isRequired,
    par: PropTypes.number.isRequired
  }).isRequired,
  selectCourse: PropTypes.func.isRequired
}

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
})

class CoursePicker extends Component {
  state = {
    dataSource: ds.cloneWithRowsAndSections(clubsJson),
    query: ''
  }

  setSearchQuery = (query) => {
    const { dataSource } = this.state
    let newDataSource = null
    if (query !== null && query.length > 1) {
      const filtered = filter(clubsJson, query.toLowerCase())
      newDataSource = dataSource.cloneWithRowsAndSections(filtered)
    } else {
      newDataSource = dataSource.cloneWithRowsAndSections(clubsJson)
    }
    this.setState({ dataSource: newDataSource, query })
  }

  render() {
    const { query, dataSource } = this.state


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
          dataSource={dataSource}
          renderRow={rowData =>
            <CourseRow course={rowData} selectCourse={this.props.selectCourse} />
          }
          renderSectionHeader={renderSectionHeader}
          keyboardShouldPersistTaps="always"
        />
      </View>
    )
  }
}

CoursePicker.propTypes = {
  selectCourse: PropTypes.func.isRequired
}

export default CoursePicker
