import React, { PropTypes } from 'react'
import { TouchableHighlight, Text } from 'react-native'

const tabStyle = (padding, isCurrent) => ({
  flex: 1,
  paddingTop: padding,
  paddingBottom: padding,
  backgroundColor: isCurrent ? '#D9EEFF' : '#eee',
  flexDirection: 'row',
  justifyContent: 'center'
})

const Tab = ({ tab, isCurrent, onChange, fontSize, padding }) => {
  const text = `${tab.icon} ${tab.title}`
  return (
    <TouchableHighlight
      underlayColor="#feb"
      style={tabStyle(padding, isCurrent)}
      onPress={() => onChange(tab.value)}
    >
      <Text style={{ fontSize, color: isCurrent ? '#222' : '#999' }}>
        {text}
      </Text>
    </TouchableHighlight>
  )
}

Tab.propTypes = {
  tab: PropTypes.shapeOf({
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired
}


export default Tab
