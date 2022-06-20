import {Button} from 'native-base';
import React from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';

export default function CardPoster(props) {
  // console.log(props);
  return (
    <View style={style.card}>
      <Image
        source={require('../assets/img/poster.png')}
        style={style.poster}
      />
      <Text style={style.textTitle}>{props.data.name}</Text>
      <Text style={style.textGenre}>{props.data.genre}</Text>
      <Button
        variant="outline"
        size="sm"
        _text={{
          color: 'purple.600',
        }}
        borderColor="purple.600"
        onPress={() =>
          props.navigation.navigate('MovieDetail', {detailMovie: props.data})
        }>
        Details
      </Button>
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
  textTitle: {
    // fontSize: '20',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
    letterSpacing: 1,
    marginVertical: 10,
  },
  textGenre: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
});
