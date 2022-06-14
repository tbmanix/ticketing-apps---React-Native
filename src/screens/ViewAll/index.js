import React from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import style from './styles';
import CardPoster from '../../components/CardPoster';

export default function ViewAllScreen() {
  const poster = [
    {
      img: '../../assets/img/poster.png',
      name: 'Spiderman',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'One Piece',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'Bleach',
      genre: 'Sci Fi, Action, Drama',
    },
    {
      img: '../../assets/img/poster.png',
      name: 'Dragon Ball',
      genre: 'Sci Fi, Action, Drama',
    },
    ,
  ];
  const page = [1, 2, 3, 4, 5];
  return (
    <ScrollView>
      <View>
        <View style={style.listMovie}>
          <Text>T</Text>
        </View>
        <View style={style.containerPoster}>
          {poster.map((item, index) => (
            <CardPoster poster={item} key={index} />
          ))}
        </View>
        <View style={style.pagination}>
          {page.map(item => (
            <TouchableOpacity style={style.btnPaginate}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
