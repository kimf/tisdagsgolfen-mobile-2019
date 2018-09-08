import React from 'react'
import { View } from 'react-native'
import { number, shape } from 'prop-types'

import TGText from '../shared/TGText'
import { colors } from '../../styles'

const UserColumn = ({ item, scoreItem, flex }) => {
  const name = item.users.map(p => p.firstName).join(', ')

  return (
    <View
      style={{
        flex,
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20
      }}>
      <TGText style={{ fontWeight: 'bold', lineHeight: 24, fontSize: 14 }}>{name}</TGText>
      <TGText style={{ color: colors.muted, fontSize: 12 }}>
        {scoreItem.extraStrokes} extraslag
      </TGText>
    </View>
  )
}

UserColumn.propTypes = {
  flex: number,
  item: shape().isRequired,
  scoreItem: shape({
    extraStrokes: number.isRequired
  }).isRequired
}

UserColumn.defaultProps = {
  flex: 3
}

export default UserColumn
