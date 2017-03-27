import React, { Component } from 'react'
import { Switch, View, StyleSheet, Platform, DatePickerAndroid, DatePickerIOS } from 'react-native'
// import moment from 'moment'
// import 'moment/locale/sv'

import TGText from 'shared/TGText'
import BottomButton from 'shared/BottomButton'
import styles from 'styles'
import { withCreateEventMutation } from 'mutations/createEventMutation'

const { string, shape, func } = React.PropTypes

class NewEventSetup extends Component {
  static propTypes = {
    course: shape({
      id: string.isRequired,
      club: string.isRequired,
      name: string.isRequired
    }).isRequired,
    changeCourse: func.isRequired,
    createEvent: func.isRequired,
    seasonId: string.isRequired,
    done: func.isRequired
  }

  state = {
    isStrokes: false,
    teamEvent: false,
    isSaving: false,
    error: false,
    startsAt: new Date()
  }

  onSubmit = () => {
    this.setState({ isSaving: true })
    const { isStrokes, teamEvent, startsAt } = this.state
    const { seasonId, createEvent, done } = this.props
    const scoringType = isStrokes ? 'strokes' : 'points'
    const courseId = this.props.course.id

    createEvent({ seasonId, courseId, teamEvent, scoringType, startsAt })
      .then(() => {
        this.setState({ isSaving: false, error: false })
        done()
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

  renderDatePicker = () => {
    const startsAt = this.state.startsAt
    if (Platform.OS === 'android') {
      return <DatePickerAndroid />
    }
    return <DatePickerIOS date={startsAt} mode="date" onDateChange={this.onDateChange} />
  }

  render() {
    const { changeCourse, course } = this.props
    const { teamEvent, isStrokes, startsAt, isSaving, error } = this.state
    let showError
    if (error) {
      showError = (
        <TGText
          style={{ backgroundColor: 'red', width: '100%', padding: 10, color: 'white', fontWeight: 'bold', textAlign: 'center' }}
        >
          Något gick fel med att spara, se över infon
        </TGText>
      )
    }

    return (
      <View style={styles.container}>
        <View style={[styles.inlineHeader, { flexDirection: 'row' }]}>
          <TGText style={{ flex: 1, padding: 10 }}>{course.club}: {course.name}</TGText>
          <TGText
            style={{ flex: 1, padding: 10, textAlign: 'right' }}
            onPress={() => changeCourse(null)}
          >
            Byt
          </TGText>
        </View>

        {showError}

        <View style={[styles.formRow, { flexDirection: 'row' }]}>
          <View style={[styles.formColumn, { borderRightWidth: StyleSheet.hairlineWidth }]}>
            <TGText style={styles.label}>Lagtävling?</TGText>
            <Switch
              onValueChange={te => this.setState({ teamEvent: te })}
              style={styles.formColumnContent}
              value={teamEvent}
            />
          </View>
          <View style={styles.formColumn}>
            <TGText style={styles.label}>Slaggolf?</TGText>
            <Switch
              onValueChange={isS => this.setState({ isStrokes: isS })}
              style={styles.formColumnContent}
              value={isStrokes}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          <TGText style={styles.label}>Datum</TGText>
          {this.renderDatePicker()}
        </View>


        {isSaving || !startsAt
          ? null
          : <BottomButton title="SKAPA RUNDA" onPress={this.onSubmit} />
        }
      </View >
    )
  }
}

export default withCreateEventMutation(NewEventSetup)
