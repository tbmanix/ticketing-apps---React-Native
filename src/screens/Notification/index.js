import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Notification from '../../utils/notif';

function NotificationScreen(props) {
  const handleClickReminder = () => {
    console.log('Clicked !');
    // [without schedule]
    // Notification.reminderProductNotification();

    // [with schedule]
    const setNotification = {
      title: 'Product',
      message: 'You can buy this product',
      date: new Date(Date.now() + 5 * 1000),
    };
    console.log(setNotification);
    Notification.scheduleProductNotification(setNotification);
  };
  return (
    <View style={styles.container}>
      <Text>Notification Screen</Text>
      <Button title="Reminder Product !" onPress={handleClickReminder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationScreen;
