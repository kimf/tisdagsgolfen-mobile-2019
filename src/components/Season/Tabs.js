import React from 'react'
import { View } from 'react-native'

import Tab from './Tab'

const Tabs = ({ currentRoute, onChange, tabs, bottom }) => {
  const fontSize = bottom ? 16 : 12

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal: bottom ? 0 : 10,
        marginVertical: bottom ? 0 : 5
      }}
    >
      { tabs.map(tab =>
        <Tab
          key={tab.value}
          tab={tab}
          isCurrent={currentRoute === tab.value}
          onChange={onChange}
          fontSize={fontSize}
          padding={bottom ? 16 : 8}
        />
      )}
    </View>
  )
}

const { arrayOf, string, func, shape, bool } = React.PropTypes

Tabs.propTypes = {
  currentRoute: string.isRequired,
  onChange: func.isRequired,
  tabs: arrayOf(shape()).isRequired,
  bottom: bool
}

Tabs.defaultProps = {
  bottom: false
}

export default Tabs
