import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

export default function AuthNavgiator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={LoginScreen}
        name="Login"
        options={{headerShown: false}} //hide header
      />
      <Stack.Screen
        component={RegisterScreen}
        name="Register"
        options={{headerShown: false}} //hide header
      />
    </Stack.Navigator>
  );
}
