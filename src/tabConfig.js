const navigatorStyle = {
  navBarTranslucent: true,
  drawUnderNavBar: false,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  navBarSubtitleColor: 'white',
  statusBarTextColorScheme: 'light',
  navBarBackgroundColor: '#2ecc71',
  navBarHideOnScroll: false
}
/* eslint-disable import/no-unresolved */
export default {
  tabs: [
    {
      label: 'Ledartavla',
      screen: 'tisdagsgolfen.Leaderboard', // this is a registered name for a screen
      icon: require('./images/leaderboard.png'),
      selectedIcon: require('./images/leaderboard-selected.png'), // iOS only
      title: 'Ledartavla',
      navigatorStyle
    },
    {
      label: 'Rundor',
      screen: 'tisdagsgolfen.EventList',
      icon: require('./images/events.png'),
      selectedIcon: require('./images/events-selected.png'), // iOS only
      title: 'Rundor',
      navigatorStyle
    },
    {
      label: 'Profil',
      screen: 'tisdagsgolfen.Profile',
      icon: require('./images/user.png'),
      selectedIcon: require('./images/user-selected.png'), // iOS only
      title: 'Profil',
      navigatorStyle
    }
  ],
  tabsStyle: {
    tabBarButtonColor: '#55676e',
    tabBarSelectedButtonColor: '#2ecc71',
    tabBarBackgroundColor: 'white'
  }
}
/* eslint-enable import/no-unresolved */
