import React, { Component } from 'react'
import { Switch, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Calendar from 'react-native-calendar-datepicker'
import moment from 'moment'
import 'moment/locale/sv'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from '../../../styles'

class NewEventSetup extends Component {
  state = {
    isStrokes: false,
    teamEvent: false,
    isSaving: false,
    error: false,
    startsAt: moment().startOf('day')
  }

  onSubmit = () => {
    this.setState({ isSaving: true })
    const { isStrokes, teamEvent, startsAt } = this.state
    const { seasonId, createEvent, goBack } = this.props
    const scoringType = isStrokes ? 'strokes' : 'points'
    const courseId = this.props.course.id
    const course = this.props.course.name

    createEvent({ seasonId, course, courseId, teamEvent, scoringType, startsAt })
      .then(() => {
        this.setState({ isSaving: false, error: false })
        goBack()
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.warn(e)
        this.setState({ error: e, isSaving: false })
      })
  }

  onDateChange = (startsAt) => {
    this.setState({ startsAt })
  }

  render() {
    const { changeCourse, course } = this.props
    const { teamEvent, isStrokes, startsAt, isSaving, error } = this.state
    let showError
    if (error) {
      showError = <Text style={{ color: '#c00', fontSize: 20 }}>Något gick fel med att spara, se över infon</Text>
    }

    return (
      <View style={[styles.container, { alignItems: 'stretch', flexDirection: 'column' }]}>
        <View style={styles.inlineHeader}>
          <Text>{course.name}</Text>
          <TouchableOpacity onPress={() => changeCourse(null)}>
            <Text>Byt bana</Text>
          </TouchableOpacity>
        </View>

        {showError}

        <View style={[styles.formRow, { flexDirection: 'row' }]}>
          <View style={[styles.formColumn, { borderRightWidth: StyleSheet.hairlineWidth, borderColor: '#cecece' }]}>
            <Text style={styles.label}>Lagtävling?</Text>
            <Switch
              onValueChange={te => this.setState({ teamEvent: te })}
              style={styles.formColumnContent}
              value={teamEvent}
            />
          </View>
          <View style={styles.formColumn}>
            <Text style={styles.label}>Slaggolf?</Text>
            <Switch
              onValueChange={isS => this.setState({ isStrokes: isS })}
              style={styles.formColumnContent}
              value={isStrokes}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <Calendar
            onChange={d => this.onDateChange(d)}
            selected={startsAt}
            minDate={moment().startOf('day')}
            maxDate={moment().add(2, 'years').startOf('day')}
          />
        </View>


        { isSaving || !startsAt
          ? null
          :
          <TouchableOpacity style={styles.btn} onPress={this.onSubmit}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'Avenir',
                fontWeight: 'bold'
              }}
            >
              SKAPA RUNDA
            </Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const { string, number, shape, func } = React.PropTypes

NewEventSetup.propTypes = {
  course: shape({
    id: number.isRequired,
    name: string.isRequired
  }).isRequired,
  changeCourse: func.isRequired,
  goBack: func.isRequired,
  createEvent: func.isRequired,
  seasonId: string.isRequired
}

const createEventMutation = gql`
  mutation createEvent(
    $seasonId:ID!,
    $course: String!,
    $courseId:Int!,
    $teamEvent:Boolean!,
    $scoringType:String!,
    $startsAt:DateTime!
  )
  {
    createEvent(
      seasonId: $seasonId,
      courseId: $courseId,
      course: $course,
      teamEvent: $teamEvent,
      scoringType: $scoringType,
      startsAt: $startsAt,
      status: "planned",
      oldId: 0
    ) {
      id
      status
      startsAt
      course
      courseId
      scoringType
      teamEvent
      oldId
    }
  }
`

const NewEventSetupWithMutation = graphql(createEventMutation, {
  props({ mutate }) {
    return {
      createEvent({ seasonId, courseId, course, teamEvent, scoringType, startsAt }) {
        return mutate({
          variables: { seasonId, courseId, course, teamEvent, scoringType, startsAt }
        })
      }
    }
  }
})(NewEventSetup)


export default NewEventSetupWithMutation
