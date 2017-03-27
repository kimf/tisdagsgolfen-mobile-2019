import React from 'react'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

const Tab = ({ tab, isCurrent, onChange }) => {
  const text = `${tab.icon} ${tab.title}`
  return (
    <TGText
      key={tab.title}
      viewStyle={[styles.tab, { backgroundColor: isCurrent ? colors.green : colors.lightGray }]}
      style={[
        styles.tabText,
        {
          color: isCurrent ? '#fff' : '#444',
          fontWeight: isCurrent ? 'bold' : 'normal'
        }
      ]}
      onPress={() => onChange(tab.value)}
    >
      {text}
    </TGText>
  )
}

const { shape, string, bool, func } = React.PropTypes

Tab.propTypes = {
  tab: shape({
    value: string.isRequired,
    icon: string.isRequired,
    title: string.isRequired
  }).isRequired,
  isCurrent: bool.isRequired,
  onChange: func.isRequired
}

export default Tab
