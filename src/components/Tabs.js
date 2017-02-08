import React from 'react'
import { View, Button } from 'react-native'

const Tabs = ({currentRoute, onChange, tabs, bottom}) => {
  return (
    <View style={{
      padding: bottom ? 10 : 5,
      backgroundColor: '#eee',
      flexDirection: 'row',
      justifyContent: 'space-around'
    }}>
      { tabs.map(tab =>
        <Button
          key={tab.value}
          style={{
            flex: 1,
            backgroundColor: currentRoute === tab.value ? '#fff' : '#000',
            fontSize: bottom ? 100 : 12
          }}
          color={currentRoute === tab.value ? '#000' : '#ccc'}
          title={tab.title}
          onPress={() => onChange(tab.value)}
        />
      )}
    </View>
  )
}

export default Tabs
