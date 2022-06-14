import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function Navbar() {
  return (
    <View>
      <Text
        style={{
          fontSize: 50,
          color: 'purple',
          backgroundColor: 'blue',
          textAlign: 'center',
          //   position: 'absolute',
          top: 0,
        }}>
        NAVBAR
      </Text>
    </View>
  );
}
