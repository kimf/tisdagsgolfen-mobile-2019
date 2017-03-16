import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

// TODO: Rewrite with TGText

const tabStyle = (padding, isCurrent) => ({
  flex: 1,
  paddingTop: padding,
  paddingBottom: padding,
  backgroundColor: isCurrent ? '#feb' : '#eee',
  flexDirection: 'row',
  justifyContent: 'center'
})

const Tab = ({ tab, isCurrent, onChange, fontSize, padding }) => {
  const text = `${tab.icon} ${tab.title}`
  return (
    <TouchableOpacity
      key={tab.title}
      style={tabStyle(padding, isCurrent)}
      onPress={() => onChange(tab.value)}
    >
      <Text style={{ fontSize, color: isCurrent ? '#000' : '#444' }}>
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
