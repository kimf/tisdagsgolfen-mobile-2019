import React from 'react'
import { View, SegmentedControlIOS } from 'react-native'

// import Tab from 'shared/Tab'

const Tabs = ({ currentRoute, onChange, tabs /* , style */ }) => {
  const currentIndex = tabs.findIndex(t => t.value === currentRoute)
  return (
    <View style={{ width: '100%', paddingVertical: 10, flex: 1, backgroundColor: '#fff' }}>
      <SegmentedControlIOS
        selectedIndex={currentIndex}
        values={tabs.map(t => t.title)}
        onValueChange={val => onChange(tabs.find(t => t.title === val).value)}
        tintColor="#2ECC71"
      />
    </View>
  )
}

/*  < View
style = {{
      ...style,
    backgroundColor: '#eee',
      flexDirection: 'row',
        justifyContent: 'center',
          alignItems: 'stretch',
            paddingHorizontal: 5,
              paddingVertical: 5
}}
  >
  {
    tabs.map(tab =>
      <Tab
        key={tab.value}
        tab={tab}
        isCurrent={currentRoute === tab.value}
        onChange={onChange}
        fontSize={16}
        padding={10}
      />
    )
  }
  </View >*/

const { arrayOf, string, func, shape } = React.PropTypes

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  tabs: arrayOf(shape()),
  style: View.propTypes.style
}

Tabs.defaultProps = {
  bottom: false,
  style: {},
  tabs: [
    { value: 'totalPoints', icon: '🤷', title: 'Poäng' },
    { value: 'beers', icon: '🍻', title: 'Öl' },
    { value: 'kr', icon: '💸', title: 'Skuld' }
  ]
}

export default Tabs
