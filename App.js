import React from 'react';
import MainStackNavigator from './src/navigation';
import {NativeBaseProvider} from 'native-base';

// import {Provider} from 'react-redux';
// import stores from './src/stores';
// const {persistor, store} = stores;
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store from './src/stores';

export default function App() {
  return (
    <Provider store={Store.store}>
      <PersistGate loading={null} persistor={Store.persistor}>
        <NativeBaseProvider>
          <MainStackNavigator />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
