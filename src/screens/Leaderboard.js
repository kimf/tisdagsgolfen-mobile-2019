import React, { Component } from 'react'
import { View, Image, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { LogView } from 'react-native-device-log'
import { compose } from 'react-apollo'

import leaderboardQuery, { withLeaderboardQuery } from 'queries/leaderboardQuery'

import { ranked } from 'utils'
import withOneSignal from 'withOneSignal'
import { changeSeason, changeSort } from 'actions/app'
import { navigatorStyle } from 'styles'

import LeaderboardCard from 'Season/LeaderboardCard'
import SeasonPicker from 'Season/SeasonPicker'
import Tabs from 'shared/Tabs'
import EmptyState from 'shared/EmptyState'
import TGText from 'shared/TGText'

import ImageHeaderScrollView from 'shared/ImageHeaderScrollView'
import TriggeringView from 'shared/TriggeringView'

// eslint-disable-next-line import/no-unresolved
import userImg from '../images/user.png'

const { arrayOf, bool, func, shape, string } = React.PropTypes

class Leaderboard extends Component {

  static propTypes = {
    userId: string.isRequired,
    seasons: arrayOf(shape({
      name: string,
      id: string,
      closed: bool,
      photo: shape({
        url: string
      })
    })).isRequired,
    seasonId: string.isRequired,
    sorting: string.isRequired,
    onChangeSort: func.isRequired,
    onChangeSeason: func.isRequired,
    data: shape({
      loading: bool,
      players: arrayOf(LeaderboardCard.propTypes.data)
    }),
    navigator: shape({
      setOnNavigatorEvent: func.isRequired
    }).isRequired
  }

  static defaultProps = {
    data: {
      loading: true,
      players: []
    },
    activeEvent: null
  }

  static navigatorButtons = {
    leftButtons: [
      {
        icon: userImg,
        id: 'profile'
      },
      {
        title: 'Log',
        id: 'log'
      }
    ]
  }

  constructor(props) {
    super(props)
    this.setButtons()
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = { showSeasonPicker: false, showLog: false }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seasonId && (nextProps.seasonId !== this.props.seasonId)) {
      this.setButtons(nextProps.seasonId)
    }
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'toggleSeasonpicker') {
        this.toggleSeasonpicker()
        this.setButtons()
      } else if (event.id === 'log') {
        this.toggleLog()
      } else if (event.id === 'profile') {
        this.props.navigator.showModal({
          animated: true,
          navigatorStyle: {
            ...navigatorStyle,
            tabBarHidden: true
          },
          screen: 'tisdagsgolfen.Profile',
          title: 'Profil'
        })
      }
    }
  }

  setButtons = (newSeasonId = null) => {
    const caret = this.state.showSeasonPicker ? '↑' : '↓'
    const { seasons, seasonId } = this.props
    const findId = newSeasonId || seasonId
    const seasonName = seasons.find(s => s.id === findId).name
    this.props.navigator.setButtons({
      rightButtons: [{
        title: `${seasonName} ${caret}`,
        id: 'toggleSeasonpicker'
      }],
      animated: true
    })
  }

  changeSort = (sorting) => {
    this.listView.scrollTo({ x: 0, y: 0, animated: true })
    this.props.onChangeSort(sorting)
  }

  toggleSeasonpicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ showSeasonPicker: !this.state.showSeasonPicker })
  }

  changeSeason = (currentSeasonId) => {
    this.props.onChangeSeason(currentSeasonId)
    this.setState({ showSeasonPicker: false })
  }

  toggleLog = () => {
    this.setState({ showLog: !this.state.showLog })
  }

  render() {
    if (this.props.data.loading) {
      return null
    }

    const { data, sorting, seasonId, seasons, userId } = this.props
    const { showSeasonPicker } = this.state

    let sortedPlayers = null

    if (sorting === 'beers') {
      const sorted = data.players.slice().sort((a, b) => b.totalBeers - a.totalBeers)
      sortedPlayers = ranked(sorted, 'beerPos', 'totalBeers')
    } else if (sorting === 'kr') {
      const sorted = data.players.slice().sort((a, b) => a.totalKr - b.totalKr)
      sortedPlayers = ranked(sorted, 'krPos', 'totalKr')
    } else {
      sortedPlayers = data.players.slice().sort((a, b) => a.position - b.position)
    }

    const season = seasons.find(s => s.id === seasonId)
    const emptyLeaderboard = sortedPlayers.filter(sl => sl.eventCount !== 0).length === 0
    const showLeaderboardTabs = !emptyLeaderboard && parseInt(season.name, 10) > 2015
    const showPhoto = sorting === 'totalPoints' && season.closed && season.photo.url

    if (this.state.showLog) {
      return (
        <LogView
          style={{ flex: 1 }}
          inverted={false}
          timeStampFormat="HH:mm:ss"
          multiExpanded
        />
      )
    }

    const activeEvent = false

    return (
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        {showSeasonPicker
          ? <SeasonPicker
            seasons={seasons}
            currentSeasonId={season.id}
            onChangeSeason={s => this.changeSeason(s)}
          />
          : null
        }

        {showLeaderboardTabs
          ? <Tabs
            currentRoute={sorting}
            onChange={sort => this.changeSort(sort)}
          />
          : null
        }

        {emptyLeaderboard
          ? <EmptyState text="Inga rundor spelade ännu" />
          : <ImageHeaderScrollView
            maxHeight={showPhoto ? 220 : 0}
            minHeight={0}
            ref={(c) => { this.listView = c }}
            renderHeader={() => (
              showPhoto ? (
                <Image
                  style={{ width: '100%', height: 220 }}
                  source={{ uri: season.photo.url, cache: 'force-cache' }}
                  resizeMode="cover"
                />
              ) : null
            )}
          >
            <View style={{ height: 1000 }}>
              <TriggeringView
                onHide={() => { }}
              >
                {sortedPlayers.map(player => (
                  <LeaderboardCard key={`l_${player.id}`} currentUserId={userId} data={player} sorting={sorting} />
                ))}
              </TriggeringView>
            </View>
          </ImageHeaderScrollView>
        }
        {activeEvent ? <TGText
          viewStyle={{ backgroundColor: '#c00', marginTop: 10, paddingVertical: 20, width: '100%' }}
          style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}
          onPress={() => this.props.navigator.showModal({
            screen: 'tisdagsgolfen.ScoreEvent',
            title: 'Fortsätt simma...',
            passProps: {},
            animated: true
          })}
        >
          FORTSÄTT AKTIV RUNDA PÅ {activeEvent.course.name.toUpperCase()}
        </TGText> : null}
      </View>
    )
  }
}

const mapStateToProps = state => ({
  seasonId: state.app.seasonId,
  userId: state.app.user.id,
  sorting: state.app.sorting,
  seasons: state.app.seasons
})

const mapDispatchToProps = dispatch => ({
  onChangeSeason: seasonId => dispatch(changeSeason(seasonId)),
  onChangeSort: sorting => dispatch(changeSort(sorting))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLeaderboardQuery,
  withOneSignal
)(Leaderboard)
