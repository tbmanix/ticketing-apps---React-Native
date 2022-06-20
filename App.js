import React from 'react';
import MainStackNavigator from './src/navigation';
import {NativeBaseProvider} from 'native-base';

import {Provider} from 'react-redux';
import stores from './src/stores';
const {persistor, store} = stores;

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainStackNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}
