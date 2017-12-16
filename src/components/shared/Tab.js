import React from 'react'
import { shape, string, bool, func } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const Tab = ({ tab, isCurrent, onChange }) => {
  const text = `${tab.icon} ${tab.title}`
  return (
    <TGText
      key={tab.title}
      viewStyle={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      style={{
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 12,
        color: isCurrent ? colors.blue : colors.dark,
        fontWeight: isCurrent ? 'bold' : 'normal'
      }}
      onPress={() => onChange(tab.value)}>
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
