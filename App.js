import React from 'react';
import MainStackNavigator from './src/navigation';
import {NativeBaseProvider} from 'native-base';

// import {Provider} from 'react-redux';
// import stores from './src/stores';
// const {persistor, store} = stores;
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store from './src/stores';
import PushNotification from 'react-native-push-notification';
// import {baseURL} from '@env';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // Notif remote
    PushNotification.localNotification({
      channelId: 'new-product',
      title: notification.title,
      message: notification.message,
    });

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true, //remote
  // requestPermissions: false, //local
});

PushNotification.subscribeToTopic('new-movie'); //Active
// PushNotification.unsubscribeFromTopic('new-movie'); //notActive

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
