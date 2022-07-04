import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen(props) {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      if (token) {
        props.navigation.replace('AppScreen');
      } else {
        props.navigation.replace('AuthScreen');
      }
    }, 1000);
  };

  return (
    <View
      style={{
        // flexDirection: 'row',
        backgroundColor: '#506895',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <Text>Splash Screen</Text> */}
      {/* <Image
        source={require('../../assets/img/logo.png')}
        style={{width: 100, height: 40}}
      /> */}
      <Text
        style={{
          fontSize: 30,
          fontWeight: '900',
          color: '#ffff',
          paddingTop: 10,
        }}>
        Ticketing
      </Text>
    </View>
  );
}
