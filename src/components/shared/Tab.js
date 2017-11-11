import React from 'react'
import { shape, string, bool, func } from 'prop-types'

import TGText from 'shared/TGText'
import styles, { colors } from 'styles'

const Tab = ({ tab, isCurrent, onChange }) => {
  const text = `${tab.icon} ${tab.title}`
  return (
    <TGText
      key={tab.title}
      viewStyle={[styles.tab, { backgroundColor: isCurrent ? colors.gray : colors.lightGray }]}
      style={[
        styles.tabText,
        {
          color: isCurrent ? colors.white : colors.dark,
          fontWeight: isCurrent ? 'bold' : 'normal'
        }
      ]}
      onPress={() => onChange(tab.value)}
    >
      {text}
    </TGText>
  )
}

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
