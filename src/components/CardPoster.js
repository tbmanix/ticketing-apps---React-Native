import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Button,
} from 'react-native';

export default function CardPoster(props) {
  console.log(props);
  return (
    <View style={style.card}>
      <Image
        source={require('../assets/img/poster.png')}
        style={style.poster}
      />
      <Text style={{marginTop: 10}}>{props.poster.name}</Text>
      <Text style={{marginBottom: 20}}>{props.poster.genre}</Text>
      <Button title="Details" />
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: 'white',
    maxWidth: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  poster: {
    width: 140,
    borderRadius: 10,
  },
});
