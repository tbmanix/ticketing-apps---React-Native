import {Image} from 'native-base';
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
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
          <Image
            source={require('../assets/img/Vector.png')}
            alt="img_logo"
            w="20"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={openDrawer}
        style={{
          justifyContent: 'center',
        }}>
        <Icon name="menu" size={25} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
});
