import React from 'react';
import MainStackNavigator from './src/navigation';
import {NativeBaseProvider} from 'native-base';

export default function App() {
  return (
    <NativeBaseProvider>
      <MainStackNavigator />
    </NativeBaseProvider>
  );
}
