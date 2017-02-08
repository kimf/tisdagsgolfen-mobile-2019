import React from 'react'
import { View, TouchableHighlight, Text } from 'react-native'

const tabStyle = (padding, isCurrent) => {
  return {
    flex: 1,
    paddingTop: padding,
    paddingBottom: padding,
    backgroundColor: isCurrent ? '#D9DADE' : '#eee',
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: isCurrent ? 1 : 0.5
  }
}

const Tab = ({tab, isCurrent, onChange, fontSize, padding}) => {
  const opacity = isCurrent ? 1 : 0.5;
  const text = `${tab.icon} ${tab.title}`;
  return(
    <TouchableHighlight style={tabStyle(padding, isCurrent)} onPress={() => onChange(tab.value)}>
      <Text style={{fontSize, color: isCurrent ? '#222' : '#999'}}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}


const Tabs = ({currentRoute, onChange, tabs, bottom}) => {
  const fontSize = bottom ? 14 : 12;
  const padding = bottom ? 16 : 10;

  return (
    <View style={{
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: bottom ? 0 : 5
    }}>
      { tabs.map(tab =>
        <Tab
          key={tab.value}
          tab={tab}
          isCurrent={currentRoute === tab.value}
          onChange={onChange}
          fontSize={fontSize}
          padding={padding}
        />
      )}
    </View>
  )
}

export default Tabs
