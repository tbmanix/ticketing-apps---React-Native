import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Header(props) {
  const openDrawer = () => {
    props.navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>TICKITZ</Text>
      </View>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
  },
});
