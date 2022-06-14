import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function Button(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          backgroundColor: 'darkblue',
          padding: 15,
          borderRadius: 5,
          width: '100%',
          alignSelf: 'center',
          marginVertical: 5,
          backgroundColor: '#5f2eea',
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}
