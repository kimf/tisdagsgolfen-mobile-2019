import React from 'react'
import { View } from 'react-native'
import { bool, number, shape } from 'prop-types'

import TGText from 'shared/TGText'
import { colors } from 'styles'

const UserColumn = ({ teamEvent, item, scoreItem, flex }) => {
  const playerNames = item.users.map(p => p.firstName)
  const name = teamEvent
    ? playerNames.join(', ')
    : `${item.user.firstName} ${item.user.lastName.substr(0, 1)}`

  return (
    <View style={{ flex, paddingTop: 20, paddingLeft: 20, paddingBottom: 20 }}>
      <TGText style={{ fontWeight: 'bold', lineHeight: 24, fontSize: 14 }}>
        {name}
      </TGText>
      <TGText style={{ color: colors.muted, fontSize: 12 }}>
        {scoreItem.extraStrokes} extraslag
      </TGText>
    </View>
  )
}

UserColumn.propTypes = {
  flex: number,
  teamEvent: bool.isRequired,
  item: shape().isRequired,
  scoreItem: shape({
    extraStrokes: number.isRequired
  }).isRequired
}

UserColumn.defaultProps = {
  flex: 3
}

export default UserColumn
