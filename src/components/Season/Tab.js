import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

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
    <TouchableOpacity
      style={tabStyle(padding, isCurrent)}
      onPress={() => onChange(tab.value)}
    >
      <Text style={{ fontSize, color: isCurrent ? '#222' : '#999' }}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const { shape, string, bool, func, number } = React.PropTypes

Tab.propTypes = {
  tab: shape({
    value: string.isRequired,
    icon: string.isRequired,
    title: string.isRequired
  }).isRequired,
  isCurrent: bool.isRequired,
  onChange: func.isRequired,
  fontSize: number.isRequired,
  padding: number.isRequired
}


export default Tab
