import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function Footer() {
  return (
    <View>
      <Text
        style={{
          fontSize: 100,
          color: 'purple',
          backgroundColor: 'blue',
          textAlign: 'center',
        }}>
        FOOTER
      </Text>
    </View>
  );
}
