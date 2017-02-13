import React, { PropTypes } from 'react'
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
          padding={bottom ? 12 : 8}
        />
      )}
    </View>
  )
}

Tabs.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape).isRequired,
  bottom: PropTypes.bool
}

Tabs.defaultProps = {
  bottom: false
}

export default Tabs
